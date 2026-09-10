'use client';

// PANTALLA E — Entrar (26-AUTH-MODERNO.md: magic link/OTP como método PRIMARIO,
// Google OAuth como mejora secundaria; nunca contraseña). Conectada a
// Supabase Auth real (Sesión 5) — el enlace vuelve a /auth/callback, que
// intercambia el código por sesión y manda a /app.

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

type Estado = 'idle' | 'enviando' | 'enviado' | 'error';
type TipoError = 'formato' | 'envio' | null;

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.87-3.04.87-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.97 10.73A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.19.29-1.73V4.94H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.06l3.01-2.33Z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.94l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z" />
    </svg>
  );
}

function EntrarContent() {
  const params = useSearchParams();
  const plan = params.get('plan');
  const modoGratis = params.get('modo') === 'gratis';

  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState<Estado>('idle');
  const [tipoError, setTipoError] = useState<TipoError>(null);
  const [enviandoGoogle, setEnviandoGoogle] = useState(false);

  const contexto = plan === 'anual'
    ? 'Elegiste el plan anual — entra para activar tus 7 días gratis.'
    : plan === 'mensual'
    ? 'Elegiste el plan mensual — entra para activar tus 7 días gratis.'
    : modoGratis
    ? 'Entra para guardar tu plan y seguir sin pagar por ahora.'
    : 'Entra para ver tu plan y empezar hoy.';

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const siguiente = plan ? `/hoy?plan=${plan}` : '/hoy';

  const enviar = async () => {
    if (!emailValido) {
      setTipoError('formato');
      setEstado('error');
      return;
    }
    setEstado('enviando');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?siguiente=${encodeURIComponent(siguiente)}`,
      },
    });
    if (error) {
      setTipoError('envio');
      setEstado('error');
      return;
    }
    setEstado('enviado');
  };

  const entrarConGoogle = async () => {
    setEnviandoGoogle(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?siguiente=${encodeURIComponent(siguiente)}`,
      },
    });
    if (error) {
      setEnviandoGoogle(false);
      setTipoError('envio');
      setEstado('error');
    }
    // Si no hay error, el navegador ya está siendo redirigido a Google.
  };

  return (
    <main className="flex min-h-dvh flex-col bg-[var(--bg)] px-6 pb-[max(24px,env(safe-area-inset-bottom))] pt-4">
      <a
        href="/"
        className="flex size-11 items-center justify-center rounded-full text-[var(--text-secondary)] [touch-action:manipulation]"
        aria-label="Volver al inicio"
      >
        <ArrowLeft size={22} aria-hidden="true" />
      </a>

      <div className="flex flex-1 flex-col justify-center">
        <AnimatePresence mode="wait">
          {estado !== 'enviado' ? (
            <motion.div key="form" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <h1 className="text-balance text-[28px] font-bold leading-[1.15] text-[var(--text-primary)] [font-family:var(--font-display)]">
                Entra a tu cuenta
              </h1>
              <p className="mt-2 text-[14px] leading-snug text-[var(--text-secondary)]">{contexto}</p>

              <button
                type="button"
                onClick={entrarConGoogle}
                disabled={enviandoGoogle}
                className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_28%,transparent)] bg-[var(--surface)] text-[15px] font-semibold text-[var(--text-primary)] [touch-action:manipulation] disabled:opacity-50"
              >
                <GoogleIcon />
                {enviandoGoogle ? 'Llevándote a Google…' : 'Continuar con Google'}
              </button>

              <div className="my-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-[color-mix(in_oklab,var(--text-tertiary)_20%,transparent)]" />
                <span className="text-[12px] font-medium text-[var(--text-tertiary)]">o con tu correo</span>
                <span className="h-px flex-1 bg-[color-mix(in_oklab,var(--text-tertiary)_20%,transparent)]" />
              </div>

              <label className="block">
                <span className="text-[13px] font-semibold text-[var(--text-secondary)]">Correo electrónico</span>
                <div
                  className={`mt-1.5 flex items-center gap-2 rounded-[var(--radius-button)] border bg-[var(--surface)] px-4 ${
                    estado === 'error' ? 'border-[var(--danger)]' : 'border-[color-mix(in_oklab,var(--text-tertiary)_28%,transparent)]'
                  }`}
                >
                  <Mail size={16} className="shrink-0 text-[var(--text-tertiary)]" aria-hidden="true" />
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    placeholder="tucorreo@ejemplo.com"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (estado === 'error') {
                        setEstado('idle');
                        setTipoError(null);
                      }
                    }}
                    className="h-14 w-full bg-transparent text-[16px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)]"
                  />
                </div>
                {estado === 'error' && (
                  <span className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-[var(--danger)]">
                    <AlertCircle size={13} aria-hidden="true" />
                    {tipoError === 'envio'
                      ? 'No pudimos enviarte el enlace. Inténtalo de nuevo en un momento.'
                      : 'Escribe un correo válido para poder enviarte el enlace.'}
                  </span>
                )}
              </label>

              <motion.button
                type="button"
                onClick={enviar}
                disabled={estado === 'enviando'}
                whileTap={estado === 'enviando' ? undefined : { scale: 0.97 }}
                className={`mt-5 flex h-14 w-full items-center justify-center rounded-[var(--radius-button)] text-[16px] font-semibold text-[var(--bg)] transition-opacity duration-200 [touch-action:manipulation] ${
                  estado === 'enviando' ? 'bg-[var(--accent)] opacity-60' : 'bg-[var(--accent)] shadow-[0_8px_24px_color-mix(in_oklab,var(--accent)_28%,transparent)]'
                }`}
              >
                {estado === 'enviando' ? 'Enviando enlace…' : 'Enviarme el enlace para entrar'}
              </motion.button>

              <p className="mt-4 text-center text-[12px] leading-snug text-[var(--text-tertiary)]">
                Sin contraseñas que recordar. Te mandamos un enlace de acceso a tu correo.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="enviado"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="flex size-16 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] text-[var(--accent)]"
              >
                <CheckCircle2 size={32} aria-hidden="true" />
              </motion.span>
              <h1 className="mt-5 text-balance text-[24px] font-bold leading-[1.2] text-[var(--text-primary)] [font-family:var(--font-display)]">
                Revisa tu correo
              </h1>
              <p className="mt-3 max-w-[300px] text-[15px] leading-relaxed text-[var(--text-secondary)]">
                Te enviamos un enlace de acceso a <strong className="text-[var(--accent)]">{email}</strong>. Ábrelo desde tu teléfono para entrar directo a tu plan.
              </p>
              <button
                type="button"
                onClick={() => setEstado('idle')}
                className="mt-6 text-[13px] font-medium text-[var(--text-tertiary)] underline underline-offset-2 [touch-action:manipulation]"
              >
                ¿No te llegó? Intentar con otro correo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default function EntrarPage() {
  return (
    <Suspense fallback={null}>
      <EntrarContent />
    </Suspense>
  );
}
