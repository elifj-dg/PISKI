-- Advisor de seguridad de Supabase: handle_new_user() es SECURITY DEFINER y
-- quedaba invocable directo vía RPC pública (aunque falla en la práctica por
-- depender de la variable `new` del trigger) — se revoca por defensa en
-- profundidad. El trigger sigue funcionando: corre como el dueño de la tabla,
-- no necesita permiso de EXECUTE de anon/authenticated.

revoke execute on function public.handle_new_user() from anon, authenticated, public;
