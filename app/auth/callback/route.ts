// Recibe el enlace del magic link / OAuth de Supabase, intercambia el código
// por una sesión real y redirige al destino final (26-AUTH-MODERNO.md).

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const siguiente = searchParams.get('siguiente') ?? '/hoy';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${siguiente}`);
    }
  }

  return NextResponse.redirect(`${origin}/entrar?error=enlace_invalido`);
}
