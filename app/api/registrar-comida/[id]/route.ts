// Elimina una comida registrada por error. RLS (delete_own) ya garantiza que
// un usuario solo pueda borrar sus propias filas, pero igual verificamos la
// sesión antes de intentarlo.

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'no autenticado' }, { status: 401 });
  }

  const { error } = await supabase.from('comidas_registradas').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: 'no se pudo eliminar' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
