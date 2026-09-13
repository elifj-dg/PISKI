-- Infraestructura de venta real (Hotmart): estado de membresía, dedupe de
-- eventos y log del webhook. Ver docs/sistema/18-VENTA-HOTMART.md.

alter table public.profiles
  add column subscription_status text
    check (subscription_status in ('trialing', 'active', 'past_due', 'cancelled', 'expired', 'refunded', 'chargeback')),
  add column first_paid_at timestamptz,
  add column access_until timestamptz,
  add column grace_ends_at timestamptz,
  add column hotmart_subscriber_code text;

-- Dedupe técnico: Hotmart reenvía eventos si el ACK se pierde.
create table public.processed_events (
  event_id     text primary key,
  event_type   text not null,
  payload_hash text,
  processed_at timestamptz not null default now()
);

-- Log de TODO intento (éxito y fallo) — vigilancia de salud del webhook.
create table public.webhook_log (
  id          bigserial primary key,
  event_id    text,
  type        text,
  result      text not null check (result in ('applied', 'duplicate', 'illegal', 'unauthorized', 'error')),
  received_at timestamptz not null default now()
);
create index webhook_log_received_idx on public.webhook_log (received_at desc);
create index webhook_log_result_idx on public.webhook_log (result, received_at desc);

-- Estas 2 tablas solo las toca el webhook con la clave de servicio — sin RLS
-- de usuario (no tienen user_id propio ni deben ser legibles por el cliente).
alter table public.processed_events enable row level security;
alter table public.webhook_log enable row level security;

-- Aplica un evento de Hotmart de forma atómica: dedupe + transición de
-- estado + upsert del perfil. Bloquea reactivaciones ilegales de un
-- refund/chargeback ya terminal (evento viejo reentregado).
create or replace function public.apply_hotmart_event(
  p_event_id text,
  p_event_type text,
  p_payload_hash text,
  p_user_id uuid,
  p_new_status text,
  p_trial_ends_at timestamptz default null,
  p_access_until timestamptz default null,
  p_subscriber_code text default null
) returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_current_status text;
begin
  -- Idempotencia: si ya procesamos este event_id, no hacer nada más.
  begin
    insert into processed_events (event_id, event_type, payload_hash)
    values (p_event_id, p_event_type, p_payload_hash);
  exception when unique_violation then
    return 'duplicate';
  end;

  select subscription_status into v_current_status from profiles where user_id = p_user_id;

  -- No resucitar un refund/chargeback ya terminal con un evento viejo reentregado.
  if v_current_status in ('refunded', 'chargeback') and p_new_status in ('active', 'trialing') then
    return 'illegal';
  end if;

  update profiles set
    subscription_status = p_new_status,
    plan = case when p_new_status in ('trialing', 'active') then 'pro' else plan end,
    trial_ends_at = coalesce(p_trial_ends_at, trial_ends_at),
    first_paid_at = case when p_new_status = 'active' and first_paid_at is null then now() else first_paid_at end,
    access_until = coalesce(p_access_until, access_until),
    hotmart_subscriber_code = coalesce(p_subscriber_code, hotmart_subscriber_code)
  where user_id = p_user_id;

  return 'applied';
end;
$$;

revoke execute on function public.apply_hotmart_event from anon, authenticated, public;
