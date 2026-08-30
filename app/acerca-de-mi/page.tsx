import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Acerca de mí — Gustavo Martin",
  description:
    "Trabajo entre café verde, productores, tostadores, compradores, marcas y proyectos de origen. Fundador de Curador Coffee, Q Arabica Grader y autor de El Primer Crack.",
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-6 text-[22px] leading-[1.2] font-semibold tracking-[-0.7px] sm:text-[26px]">
      {children}
    </h2>
  );
}

export default function AcercaDeMiPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col overflow-hidden">
      <header className="flex w-full items-center justify-between px-6 py-6 sm:px-12 lg:px-[180px] lg:py-[26px]">
        <Link href="/" className="shrink-0">
          <Image
            src="/hero-icon.jpg"
            alt="Gustavo Martin"
            width={256}
            height={256}
          />
        </Link>
        <Link
          href="/#suscribirte"
          className="font-label text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          SUSCRIBIRTE
        </Link>
      </header>

      <article className="flex w-full flex-col px-6 pt-6 pb-20 sm:px-12 lg:px-[180px] lg:pt-8 lg:pb-[88px]">
        <Link
          href="/"
          className="font-label w-fit text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          ← VOLVER
        </Link>

        <div className="mt-8 flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <div className="flex flex-col">
            <span className="font-label text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)]">
              ACERCA DE MÍ
            </span>

            <h1 className="mt-[18px] max-w-[905px] text-[32px] leading-[1.12] font-semibold tracking-[-1.1px] sm:text-[42px] sm:leading-[1.1] sm:tracking-[-1.6px]">
              Trabajo donde el café de origen se encuentra con el mercado
            </h1>
          </div>

          <div className="flex h-[140px] w-[140px] shrink-0 flex-col items-center justify-center gap-2 self-center rounded-[20px] bg-[var(--color-card)] outline outline-[var(--color-border)] -outline-offset-1 sm:self-auto lg:h-[180px] lg:w-[180px]">
            <span className="font-label text-center text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)]">
              FOTO
            </span>
          </div>
        </div>

        <div className="mt-10 flex max-w-[680px] flex-col gap-5 border-t border-[var(--color-border)] pt-10 text-[17px] leading-[28px]">
          <p>
            Llevo los últimos años trabajando entre café verde, productores,
            tostadores, compradores, marcas y proyectos de origen.
          </p>
          <p>
            Fundé <strong className="font-semibold">Curador Coffee</strong> y
            soy <strong className="font-semibold">Q Arabica Grader</strong>.
          </p>
          <p>Pero probablemente la mejor forma de explicar lo que hago sea otra.</p>
          <p>
            Buena parte de mi trabajo consiste en intentar conectar dos mundos
            que muchas veces hablan idiomas distintos:
          </p>
          <p className="font-semibold">
            El café que existe en origen y el mercado que tiene que
            encontrarlo.
          </p>
          <p>En ese camino he catado mucho café.</p>
          <p>
            He preparado y enviado muestras. He presentado cafés a tostadores
            y compradores. He hablado con productores sobre calidad, precios y
            oportunidades. He seguido mercados, visitado ferias y acompañado
            proyectos intentando convertir un buen producto en una propuesta
            que alguien realmente quiera comprar.
          </p>
          <p>Y he visto algo repetirse muchas veces.</p>
          <p className="font-semibold">
            Tener un buen café no significa tener un mercado.
          </p>
          <p>He visto proyectos con cafés extraordinarios avanzar.</p>
          <p>Y otros, con producto igualmente bueno, quedarse atascados.</p>
          <p>A veces el problema está en la calidad.</p>
          <p>
            Pero muchas otras está en otro lugar: el posicionamiento, el
            precio, la propuesta, el acceso a compradores, la forma de contar
            el proyecto o, simplemente, no tener suficientemente claro qué
            problema estamos intentando resolver.
          </p>
          <p>Ahí es donde suelo trabajar.</p>

          <SectionHeading>Del café a una oportunidad real</SectionHeading>

          <p>
            Trabajo con proyectos relacionados con la cadena de valor del café
            para ayudarles a{" "}
            <strong className="font-semibold">
              ordenar lo que tienen, entender dónde puede existir una
              oportunidad y encontrar una forma más clara de llevarla al
              mercado
            </strong>
            .
          </p>
          <p>Eso puede significar evaluar un café y entender dónde encaja.</p>
          <p>Construir una propuesta alrededor de un origen o productor.</p>
          <p>
            Preparar una estrategia para acercarse a tostadores y compradores.
          </p>
          <p>Revisar precios, muestras y posicionamiento.</p>
          <p>Desarrollar una nueva línea de negocio.</p>
          <p>O acompañar un proyecto que todavía tiene más preguntas que respuestas.</p>
          <p>No tengo una receta secreta.</p>
          <p>Tampoco creo que exista.</p>
          <p>
            El café tiene demasiadas variables —producto, cosecha, calidad,
            mercado, logística, personas, capital y tiempo— como para pensar
            que la misma fórmula funciona para todos.
          </p>
          <p>
            Lo que sí he aprendido es que{" "}
            <strong className="font-semibold">
              hay preguntas que conviene hacerse antes de invertir meses
              intentando vender algo que todavía no está suficientemente
              claro.
            </strong>
          </p>
          <p>Mi trabajo empieza muchas veces por ahí.</p>

          <SectionHeading>El Primer Crack</SectionHeading>

          <p>
            Cuanto más tiempo paso trabajando en café, más evidente me
            resulta otra cosa:
          </p>
          <p className="font-semibold">
            El problema no es que falte información. Es que sobra.
          </p>
          <p>
            C Price. Brasil. Vietnam. El Niño. Cosechas. Diferenciales.
            Regulación. Ferias. Nuevos procesos. Sostenibilidad. Subastas.
          </p>
          <p>Cada semana ocurre algo.</p>
          <p>Pero pocas noticias cambian realmente una decisión.</p>
          <p>
            Por eso escribo{" "}
            <strong className="font-semibold">El Primer Crack</strong>.
          </p>
          <p>
            Una vez por semana selecciono pocas señales del mercado y las
            miro desde tres preguntas:
          </p>
          <p className="font-semibold">
            Qué ocurrió.
            <br />
            Por qué importa.
            <br />
            Qué conviene observar ahora.
          </p>
          <p>No intento cubrirlo todo.</p>
          <p>Justo lo contrario.</p>
          <p className="font-semibold">La idea es leer menos y entender mejor.</p>

          <SectionHeading>Si estás construyendo algo en café</SectionHeading>

          <p>
            Si produces, compras, tuestas, importas o estás desarrollando un
            proyecto relacionado con café y crees que mi experiencia puede
            aportar una mirada útil, podemos hablar.
          </p>
          <p>No hace falta llegar con una propuesta perfectamente definida.</p>
          <p>
            A veces una conversación sirve precisamente para descubrir qué
            pregunta deberíamos estar intentando responder.
          </p>
        </div>

        <Link
          href="/contacto"
          className="mt-10 w-fit border-b border-[var(--color-ink)] pb-[7px]"
        >
          <span className="font-label text-[11px] tracking-[2px] whitespace-nowrap">
            ESCRÍBEME →
          </span>
        </Link>
      </article>

      <footer className="flex w-full flex-col gap-10 border-t border-[var(--color-border)] px-6 py-10 sm:px-12 lg:flex-row lg:justify-between lg:px-[180px] lg:py-[30px] lg:pb-[44px]">
        <div className="flex w-full flex-col gap-[10px] lg:w-[400px] lg:shrink-0">
          <span className="text-[17px] font-semibold tracking-[-0.5px] whitespace-nowrap">
            Gustavo Martin
          </span>
          <p className="text-[15px] leading-[23px] text-[var(--color-muted)]">
            Trabajo con proyectos de café en estrategia, posicionamiento y desarrollo de
            mercado.
          </p>
        </div>

        <span className="font-label text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)] lg:self-end">
          © 2026
        </span>
      </footer>
    </div>
  );
}
