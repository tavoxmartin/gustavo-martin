-- Run this once in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/agvxvqnssfbnqseqtkdi/sql/new

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text,
  content text,
  date date not null default current_date,
  slug text not null unique,
  category text not null default 'El Primer Crack'
    check (category in ('El Primer Crack', 'Segundo Crack', 'Desarrollo', 'Origen', 'Radar de Impacto')),
  issue_number integer not null,
  created_at timestamptz not null default now()
);

-- Migration for databases that already have the articles table from before
-- category/issue_number existed (i.e. still carry the old "edition" column).
-- Safe to re-run: every step is guarded and only fires while "edition" exists.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'articles' and column_name = 'edition'
  ) then
    alter table public.articles add column if not exists category text;
    alter table public.articles add column if not exists issue_number integer;

    -- Old "edition" values were free-text category names (inconsistently
    -- capitalized). Normalize them into the fixed category set.
    update public.articles
    set category = case lower(edition)
      when 'el primer crack' then 'El Primer Crack'
      when 'segundo crack' then 'Segundo Crack'
      when 'desarrollo' then 'Desarrollo'
      when 'origen' then 'Origen'
      when 'radar de impacto' then 'Radar de Impacto'
      else 'El Primer Crack'
    end
    where category is null;

    -- issue_number didn't exist before; assign sequential numbers in
    -- chronological order (oldest article = issue 1).
    with numbered as (
      select id, row_number() over (order by date asc, created_at asc) as rn
      from public.articles
    )
    update public.articles a
    set issue_number = numbered.rn
    from numbered
    where a.id = numbered.id
      and a.issue_number is null;

    alter table public.articles alter column category set default 'El Primer Crack';
    alter table public.articles alter column category set not null;
    alter table public.articles alter column issue_number set not null;

    if not exists (select 1 from pg_constraint where conname = 'articles_category_check') then
      alter table public.articles
        add constraint articles_category_check
        check (category in ('El Primer Crack', 'Segundo Crack', 'Desarrollo', 'Origen', 'Radar de Impacto'));
    end if;

    alter table public.articles drop column edition;
  end if;
end $$;

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
insert into public.articles (title, excerpt, content, date, slug, category, issue_number) values
  (
    'El arábica en máximos: qué hacer con tu carta este trimestre',
    'Tres decisiones de precio que puedes tomar ahora sin tocar la calidad de taza.',
    'Contenido completo del artículo...',
    '2026-08-05',
    'arabica-en-maximos',
    'El Primer Crack',
    4
  ),
  (
    'Colombia después de la lluvia: qué esperar de la próxima cosecha',
    'Cómo leer los partes de clima antes de que se muevan los diferenciales.',
    'Contenido completo del artículo...',
    '2026-07-22',
    'colombia-despues-de-la-lluvia',
    'Origen',
    3
  ),
  (
    'Tu tueste no es el problema, tu compra sí',
    'Por qué el margen se decide en la mesa de negociación y no en el tambor.',
    'Contenido completo del artículo...',
    '2026-07-09',
    'tu-tueste-no-es-el-problema',
    'Segundo Crack',
    2
  ),
  (
    'Especialidad sin sobreprecio: dónde deja de pagar el cliente',
    'El techo real de precio en barra y cómo encontrarlo sin perder recurrencia.',
    'Contenido completo del artículo...',
    '2026-06-30',
    'especialidad-sin-sobreprecio',
    'El Primer Crack',
    1
  )
on conflict (slug) do nothing;
