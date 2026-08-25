-- Run this once in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/agvxvqnssfbnqseqtkdi/sql/new

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text,
  content text,
  date date not null default current_date,
  slug text not null unique,
  edition text not null default 'El primer crack',
  created_at timestamptz not null default now()
);

-- Needed when this file is re-run against a database that already has the
-- articles table (create table if not exists skips column changes).
alter table public.articles add column if not exists edition text not null default 'El primer crack';

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  subscribed_at timestamptz not null default now()
);

alter table public.articles enable row level security;
alter table public.subscribers enable row level security;

-- Anyone (anon key) can read published articles.
create policy "Public can read articles" on public.articles
  for select using (true);

-- Anyone (anon key) can subscribe, but cannot read/update/delete subscribers.
create policy "Public can subscribe" on public.subscribers
  for insert with check (true);

-- Sample rows so the homepage has something to show immediately.
insert into public.articles (title, excerpt, content, date, slug, edition) values
  (
    'El arábica en máximos: qué hacer con tu carta este trimestre',
    'Tres decisiones de precio que puedes tomar ahora sin tocar la calidad de taza.',
    'Contenido completo del artículo...',
    '2026-08-05',
    'arabica-en-maximos',
    'El primer crack'
  ),
  (
    'Colombia después de la lluvia: qué esperar de la próxima cosecha',
    'Cómo leer los partes de clima antes de que se muevan los diferenciales.',
    'Contenido completo del artículo...',
    '2026-07-22',
    'colombia-despues-de-la-lluvia',
    'Origen'
  ),
  (
    'Tu tueste no es el problema, tu compra sí',
    'Por qué el margen se decide en la mesa de negociación y no en el tambor.',
    'Contenido completo del artículo...',
    '2026-07-09',
    'tu-tueste-no-es-el-problema',
    'Segundo crack'
  ),
  (
    'Especialidad sin sobreprecio: dónde deja de pagar el cliente',
    'El techo real de precio en barra y cómo encontrarlo sin perder recurrencia.',
    'Contenido completo del artículo...',
    '2026-06-30',
    'especialidad-sin-sobreprecio',
    'El primer crack'
  )
on conflict (slug) do nothing;
