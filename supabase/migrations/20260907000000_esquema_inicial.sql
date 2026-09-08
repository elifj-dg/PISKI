-- Esquema inicial de Piski — modelo de datos decidido en ESTADO.md (Sesión 1).
-- Todas las tablas con RLS activo, política de alto rendimiento
-- (select auth.uid()) = user_id, columna user_id indexada (25-BASE-DE-DATOS.md).

create table public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  edad smallint,
  sexo text check (sexo in ('M', 'F')),
  estatura numeric,
  peso numeric,
  actividad text,
  objetivo text check (objetivo in ('bajar_grasa', 'ganar_musculo', 'mantener', 'comer_mejor')),
  calorias_objetivo integer,
  proteina_objetivo integer,
  carbos_objetivo integer,
  grasas_objetivo integer,
  presupuesto text,
  horarios jsonb not null default '{}'::jsonb,
  preferencias jsonb not null default '{}'::jsonb,
  restricciones jsonb not null default '[]'::jsonb,
  plan text not null default 'gratis' check (plan in ('gratis', 'trial', 'pro')),
  trial_ends_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "select_own" on public.profiles for select using ((select auth.uid()) = user_id);
create policy "insert_own" on public.profiles for insert with check ((select auth.uid()) = user_id);
create policy "update_own" on public.profiles for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "delete_own" on public.profiles for delete using ((select auth.uid()) = user_id);

-- ────────────────────────────────────────────────────────────────

create table public.mis_basicos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  alimento text not null,
  created_at timestamptz not null default now()
);

create index mis_basicos_user_id_idx on public.mis_basicos (user_id);

alter table public.mis_basicos enable row level security;

create policy "select_own" on public.mis_basicos for select using ((select auth.uid()) = user_id);
create policy "insert_own" on public.mis_basicos for insert with check ((select auth.uid()) = user_id);
create policy "update_own" on public.mis_basicos for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "delete_own" on public.mis_basicos for delete using ((select auth.uid()) = user_id);

-- ────────────────────────────────────────────────────────────────

create table public.comidas_registradas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  descripcion text not null,
  proteina_aprox numeric,
  calorias_aprox numeric,
  momento text check (momento in ('desayuno', 'comida', 'cena', 'snack')),
  fuente text check (fuente in ('casa', 'fuera', 'pedido')),
  created_at timestamptz not null default now()
);

create index comidas_registradas_user_id_created_at_idx on public.comidas_registradas (user_id, created_at desc);

alter table public.comidas_registradas enable row level security;

create policy "select_own" on public.comidas_registradas for select using ((select auth.uid()) = user_id);
create policy "insert_own" on public.comidas_registradas for insert with check ((select auth.uid()) = user_id);
create policy "update_own" on public.comidas_registradas for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "delete_own" on public.comidas_registradas for delete using ((select auth.uid()) = user_id);

-- ────────────────────────────────────────────────────────────────

create table public.recomendaciones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  contexto jsonb not null default '{}'::jsonb,
  opciones jsonb not null default '[]'::jsonb,
  elegida text,
  feedback text check (feedback in ('me_late', 'dame_otra', 'no_tengo_eso') or feedback is null),
  created_at timestamptz not null default now()
);

create index recomendaciones_user_id_idx on public.recomendaciones (user_id);

alter table public.recomendaciones enable row level security;

create policy "select_own" on public.recomendaciones for select using ((select auth.uid()) = user_id);
create policy "insert_own" on public.recomendaciones for insert with check ((select auth.uid()) = user_id);
create policy "update_own" on public.recomendaciones for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- ────────────────────────────────────────────────────────────────
-- ai_calls: solo el servidor (BFF con secret key) escribe aquí — sin RLS de
-- insert para el usuario. Se lee para mostrarle al dueño el costo en el
-- backoffice (Sesión posterior), no al usuario final.

create table public.ai_calls (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  modelo text not null,
  tokens_in integer not null default 0,
  tokens_out integer not null default 0,
  costo_usd numeric(10, 6) not null default 0,
  created_at timestamptz not null default now()
);

create index ai_calls_user_id_idx on public.ai_calls (user_id);

alter table public.ai_calls enable row level security;

create policy "select_own" on public.ai_calls for select using ((select auth.uid()) = user_id);
-- Sin política de insert/update/delete: solo la secret key (que salta RLS) escribe.

-- ────────────────────────────────────────────────────────────────
-- Trigger: crear el perfil automáticamente cuando Supabase Auth crea un
-- usuario (magic link u OAuth) — evita el estado "usuario sin perfil".

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (user_id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
