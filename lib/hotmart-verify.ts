// Verificación del hottok de Hotmart — la única defensa que separa una
// compra real de cualquiera que le pegue al endpoint (18-VENTA-HOTMART.md).

import crypto from 'node:crypto';

function timingSafeEqualStr(a: string, b: string): boolean {
  const ba = Buffer.from(a, 'utf8');
  const bb = Buffer.from(b, 'utf8');
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

// Fail-secure: sin HOTMART_HOTTOK configurado, TODA petición al webhook falla
// (nunca un default de juguete). Se comprueba en cada llamada, no al cargar
// el módulo, para no tumbar el resto de la app si falta la variable.
export function verifyHotmart(hottok: string | undefined): boolean {
  const HOTTOK = process.env.HOTMART_HOTTOK;
  if (!HOTTOK) throw new Error('FALTA HOTMART_HOTTOK — el webhook no puede operar de forma segura');
  if (!hottok) return false;
  return timingSafeEqualStr(hottok, HOTTOK);
}
