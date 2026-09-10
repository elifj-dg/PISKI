-- Evita duplicados al agregar un básico dos veces y permite upsert por
-- (user_id, alimento) desde el nuevo endpoint de editar básicos.
create unique index mis_basicos_user_id_alimento_key on public.mis_basicos (user_id, alimento);
