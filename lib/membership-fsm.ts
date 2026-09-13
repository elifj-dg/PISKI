// Máquina de estados de la membresía de Hotmart. Ver 18-VENTA-HOTMART.md.
//
// ⚠️ TRIAL_START_EVENT es un PLACEHOLDER — antes de confiar en la métrica
// trial→pago hay que hacer una compra sandbox con prueba y capturar el JSON
// real del webhook para confirmar cómo llega Hotmart el inicio del trial
// (evento propio, o un PURCHASE_APPROVED con valor 0). Ajustar aquí.

export type MembershipStatus =
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'cancelled'
  | 'expired'
  | 'refunded'
  | 'chargeback';

const TRIAL_START_EVENT = 'SUBSCRIPTION_TRIAL_START'; // (verificar contra el panel real)

const EVENT_TO_STATUS: Record<string, MembershipStatus> = {
  [TRIAL_START_EVENT]: 'trialing',
  PURCHASE_APPROVED: 'active',
  PURCHASE_COMPLETE: 'active',
  PURCHASE_DELAYED: 'past_due',
  SUBSCRIPTION_CANCELLATION: 'cancelled',
  PURCHASE_EXPIRED: 'expired',
  PURCHASE_REFUNDED: 'refunded',
  PURCHASE_CHARGEBACK: 'chargeback',
};

export const PLAN_CHANGE_EVENT = 'SWITCH_PLAN';

export function statusForEvent(event: string): MembershipStatus | null {
  return EVENT_TO_STATUS[event] ?? null;
}
