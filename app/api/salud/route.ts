// Endpoint de salud (62-PUBLICACION-SEGURA-Y-CONTINUA.md §P4): confirma qué
// variables están configuradas SIN revelar sus valores, y expone el SHA de
// Git desplegado para comparar contra el commit local/remoto.

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    sha: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
    entorno: process.env.VERCEL_ENV ?? 'local',
    configurado: {
      supabase_url: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      supabase_publishable_key: Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
      supabase_secret_key: Boolean(process.env.SUPABASE_SECRET_KEY),
      anthropic_api_key: Boolean(process.env.ANTHROPIC_API_KEY),
    },
  });
}
