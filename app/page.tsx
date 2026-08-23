const metrics = [
  { label: "LECTORES", value: "300" },
  { label: "LO LEEN", value: "62 %" },
  { label: "TIEMPO DE LECTURA", value: "7 min", highlight: true },
  { label: "COMENTARIOS", value: "31" },
];

const previousIssues = [
  {
    label: "01 — RADAR DE IMPACTO",
    title: "El arábica en máximos: qué hacer con tu carta este trimestre",
    body: "Tres decisiones de precio que puedes tomar ahora sin tocar la calidad de taza.",
    date: "05 AGO 2026",
  },
  {
    label: "02 — ORIGEN",
    title: "Colombia después de la lluvia: qué esperar de la próxima cosecha",
    body: "Cómo leer los partes de clima antes de que se muevan los diferenciales.",
    date: "22 JUL 2026",
  },
  {
    label: "03 — DESARROLLO",
    title: "Tu tueste no es el problema, tu compra sí",
    body: "Por qué el margen se decide en la mesa de negociación y no en el tambor.",
    date: "09 JUL 2026",
  },
  {
    label: "04 — SEGUNDO CRACK",
    title: "Especialidad sin sobreprecio: dónde deja de pagar el cliente",
    body: "El techo real de precio en barra y cómo encontrarlo sin perder recurrencia.",
    date: "30 JUN 2026",
  },
];

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col overflow-hidden">
      <header className="flex w-full items-center justify-between px-6 py-6 sm:px-12 lg:px-[180px] lg:py-[26px]">
        <span className="text-[17px] font-semibold tracking-[-0.5px] whitespace-nowrap">
          gustavo martin
        </span>
        <a
          href="#suscribirte"
          className="font-label text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          SUSCRIBIRTE
        </a>
      </header>

      <section className="flex w-full flex-col px-6 pt-10 pb-16 sm:px-12 lg:px-[180px] lg:pt-16 lg:pb-[88px]">
        <span className="font-label text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)]">
          EL PRIMER CRACK
        </span>
        <h1 className="mt-[18px] max-w-[905px] text-[36px] leading-[1.08] font-semibold tracking-[-1.4px] sm:text-[46px] lg:text-[58px] lg:leading-[59px] lg:tracking-[-2.3px]">
          <span>Mercado, Origen, Calidad y Crecimiento de proyectos de Café</span>{" "}
          <span className="text-[var(--color-muted)]">Una vez por semana.</span>
        </h1>
        <p className="mt-[30px] max-w-[620px] text-[17px] leading-[26px] text-[var(--color-muted)]">
          Una lectura periódica de las señales que están cambiando el café: precios,
          disponibilidad, clima, origen, calidad y oportunidades de mercado.
        </p>
        <a
          href="#suscribirte"
          className="mt-[34px] w-fit border-b border-[var(--color-ink)] pb-[7px]"
        >
          <span className="font-label text-[11px] tracking-[2px] whitespace-nowrap">
            SUSCRIBIRTE A LA NEWSLETTER
          </span>
        </a>
      </section>

      <section className="flex w-full flex-col px-6 pb-16 sm:px-12 lg:px-[180px] lg:pb-[88px]">
        <span className="font-label text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)]">
          EL PRIMER CRACK · SEGUNDO CRACK · DESARROLLO · ORIGEN · RADAR DE IMPACTO
        </span>
        <h2 className="mt-4 text-[24px] leading-[1.2] font-semibold tracking-[-0.9px] sm:text-[31px] sm:leading-[35px]">
          Escribo para quienes tienen que tomar decisiones dentro del mundo del café
        </h2>

        <article className="mt-[26px] w-full rounded-[20px] bg-[var(--color-card)] p-6 outline outline-[var(--color-border)] -outline-offset-1 lg:p-[26px]">
          <div className="flex flex-col justify-between gap-2 border-b border-[var(--color-border)] pb-[18px] sm:flex-row sm:items-center">
            <span className="font-label text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)]">
              EL PRIMER CRACK · EDICIÓN #0
            </span>
            <span className="font-label text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)]">
              26 AGO 2026 · EDICIÓN 000
            </span>
          </div>

          <div className="mt-[22px] grid grid-cols-2 gap-[10px] sm:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className={`flex flex-col gap-[7px] rounded-[12px] p-[16px_18px] ${
                  m.highlight ? "bg-[var(--color-lav)]" : ""
                }`}
              >
                <span
                  className={`font-label text-[11px] tracking-[2px] whitespace-nowrap ${
                    m.highlight ? "text-[var(--color-lav-ink)]" : "text-[var(--color-muted)]"
                  }`}
                >
                  {m.label}
                </span>
                <span
                  className={`text-[25px] font-semibold tracking-[-0.8px] whitespace-nowrap ${
                    m.highlight ? "text-[var(--color-lav-ink)]" : "text-[var(--color-ink)]"
                  }`}
                >
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-[22px] max-w-[620px] text-[16px] leading-[26px] text-[var(--color-muted)]">
            Tres señales para entender qué está moviendo el café esta semana.
          </p>

          <a
            href="#"
            className="mt-5 inline-block w-fit border-b border-[var(--color-ink)] pb-[7px]"
          >
            <span className="font-label text-[11px] tracking-[2px] whitespace-nowrap">
              LEER →
            </span>
          </a>
        </article>
      </section>

      <section className="flex w-full flex-col px-6 pb-16 sm:px-12 lg:px-[180px] lg:pb-[88px]">
        <span className="font-label text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)]">
          EDICIONES ANTERIORES
        </span>
        <h2 className="mt-4 flex flex-wrap gap-x-[9px] text-[24px] leading-[1.2] font-semibold tracking-[-0.9px] sm:text-[31px] sm:leading-[35px]">
          <span>Aunque sea el pasado.</span>
          <span className="text-[var(--color-muted)]">Conocerás el porqué del hoy.</span>
        </h2>

        <ul className="mt-[30px] flex flex-col">
          {previousIssues.map((issue) => (
            <li
              key={issue.label}
              className="flex flex-col gap-3 border-t border-[var(--color-border)] py-[22px] sm:flex-row sm:gap-10"
            >
              <span className="font-label w-full pt-1 text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)] sm:w-[200px] sm:shrink-0">
                {issue.label}
              </span>
              <div className="flex flex-1 flex-col gap-[6px]">
                <p className="text-[17px] leading-[23px] font-semibold tracking-[-0.3px]">
                  {issue.title}
                </p>
                <p className="text-[16px] leading-[26px] text-[var(--color-muted)]">
                  {issue.body}
                </p>
              </div>
              <span className="font-label pt-1 text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)] sm:w-[120px] sm:shrink-0 sm:text-right">
                {issue.date}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex w-full flex-col px-6 pb-20 sm:px-12 lg:px-[180px] lg:pb-20">
        <div
          id="suscribirte"
          className="flex w-full flex-col rounded-[20px] bg-[var(--color-lav)] p-6 text-[var(--color-lav-ink)] lg:p-[42px]"
        >
          <span className="font-label text-[11px] tracking-[2px] whitespace-nowrap">
            RECÍBELO COMO UN NEWSLETTER
          </span>
          <h2 className="mt-4 flex flex-wrap items-center gap-x-[9px] text-[24px] leading-[1.2] font-semibold tracking-[-0.9px] sm:text-[31px] sm:leading-[35px]">
            <span>300 lectores.</span>
            <span className="opacity-[0.66]">Una vez por semana</span>
          </h2>
          <p className="mt-5 max-w-[600px] text-[17px] leading-[26px] opacity-[0.85]">
            No me gusta el spam, no tengo sponsors, ni me gustan los malos rollos. Puedes
            borrarte cuando quieras.
          </p>

          <form className="mt-7 flex flex-col gap-[10px] sm:flex-row sm:items-center">
            <input
              type="email"
              required
              placeholder="tu correo"
              className="w-full rounded-[10px] bg-white px-5 py-[15px] text-[15px] text-[var(--color-muted)] placeholder:text-[var(--color-muted)] focus:outline-2 focus:outline-[var(--color-lav-ink)] sm:w-[400px]"
            />
            <button
              type="submit"
              className="w-fit rounded-[10px] bg-[var(--color-lav-ink)] px-[30px] py-4 text-[15px] font-semibold whitespace-nowrap text-white hover:opacity-90"
            >
              suscribirme
            </button>
          </form>

          <p className="font-label mt-[22px] max-w-[560px] text-[11px] leading-[18px] opacity-[0.77]">
            Solo uso tu dirección de correo para el newsletter. Nada más.
          </p>
        </div>
      </section>

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

        <div className="flex w-full gap-10 lg:w-auto">
          <div className="flex flex-col gap-[11px] lg:w-[180px] lg:shrink-0">
            <span className="font-label text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)]">
              ESCRIBO
            </span>
            <a href="#" className="text-[15px] whitespace-nowrap hover:underline">
              Artículos
            </a>
            <a href="#" className="text-[15px] whitespace-nowrap hover:underline">
              Newsletter
            </a>
            <a href="#" className="text-[15px] whitespace-nowrap hover:underline">
              RSS
            </a>
          </div>

          <div className="flex flex-col gap-[11px] lg:w-[180px] lg:shrink-0">
            <span className="font-label text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)]">
              GUSTAVO
            </span>
            <a href="#" className="text-[15px] whitespace-nowrap hover:underline">
              Contacto
            </a>
            <a href="#" className="text-[15px] whitespace-nowrap hover:underline">
              Acerca de mi
            </a>
          </div>
        </div>

        <span className="font-label text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)] lg:self-end">
          © 2026
        </span>
      </footer>
    </div>
  );
}
