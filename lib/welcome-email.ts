export const WELCOME_SUBJECT = "Bienvenido a El Primer Crack, estás dentro.";

const WELCOME_LINES = [
  "Estás dentro.",
  "Y te aviso de algo desde el principio.",
  "Esto no es otro resumen de noticias de café.",
  "Para eso ya hay suficientes.",
  "Antes de contarte qué vas a recibir, déjame explicarte por qué empecé esto.",
  "Llevo los últimos años trabajando entre café verde, productores, tostadores, compradores, marcas y proyectos de origen.",
  "Fundé Curador Coffee.",
  "Soy Q Arabica Grader.",
  "Y buena parte de mi trabajo ha consistido en intentar conectar dos mundos que muchas veces hablan idiomas distintos:",
  "el café que existe en origen y el mercado que tiene que encontrarlo.",
  "En ese camino he catado mucho café.",
  "He presentado cafés a tostadores.",
  "He hablado con productores.",
  "He seguido precios.",
  "He preparado muestras.",
  "He ido a ferias.",
  "He visto proyectos muy buenos avanzar.",
  "Y otros, con producto igualmente bueno, quedarse atascados.",
  "Y cuanto más tiempo paso en café, más clara tengo una cosa.",
  "El problema no es que falte información.",
  "Es que sobra.",
  "C Price.",
  "Brasil.",
  "Vietnam.",
  "El Niño.",
  "Cosechas.",
  "Diferenciales.",
  "Ferias.",
  "EUDR.",
  "Nuevos procesos.",
  "Sostenibilidad.",
  "Subastas.",
  "Cada semana ocurre algo.",
  "Pero pocas noticias cambian realmente una decisión.",
  "El Primer Crack nace para separar esas señales del ruido.",
  "Una vez por semana voy a seleccionar pocas historias.",
  "Y las voy a mirar siempre desde tres preguntas:",
  "Qué ocurrió.",
  "Por qué importa.",
  "Qué conviene observar ahora.",
  "A veces serán tres líneas.",
  "Eso será El Primer Crack.",
  "Otras veces habrá que abrir la noticia y entender qué está ocurriendo debajo.",
  "Eso será Second Crack.",
  "Y cuando una historia merezca realmente detenerse, iremos más profundo.",
  "Mercado.",
  "Origen.",
  "Calidad.",
  "Clima.",
  "Geopolítica.",
  "Impacto.",
  "Y, sobre todo, qué significa todo eso para quienes tienen que comprar, vender, producir o hacer crecer un proyecto de café.",
  "No pretendo cubrirlo todo.",
  "De hecho, justo lo contrario.",
  "Quiero que puedas leer menos y entender mejor.",
  "Y una cosa más.",
  "Además de escribir sobre café, trabajo con proyectos que necesitan ordenar lo que tienen, entender dónde está la oportunidad y encontrar una forma más clara de llevarla al mercado.",
  "Producto.",
  "Posicionamiento.",
  "Desarrollo comercial.",
  "Origen.",
  "Comunicación.",
  "Crecimiento.",
  "No tengo una receta secreta.",
  "Tampoco creo que exista.",
  "Cada proyecto tiene demasiadas variables para eso.",
  "Pero sí hay preguntas que conviene hacerse antes de invertir meses intentando vender algo que todavía no está suficientemente claro.",
  "De eso también hablaremos por aquí.",
  "Y si algún día estás trabajando en algo relacionado con café y crees que puedo aportar, puedes escribirme.",
  "Mientras tanto:",
  "bienvenido a El Primer Crack.",
  "La próxima edición llegará pronto.",
];

const LAST_EDITION_URL = "https://gustavo-martin.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function buildWelcomeEmail() {
  const paragraphs = WELCOME_LINES.map(
    (line) =>
      `<p style="margin: 0 0 14px; font-size: 16px; line-height: 1.6; color: #333;">${escapeHtml(
        line
      )}</p>`
  ).join("\n      ");

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <p style="font-size: 13px; letter-spacing: 1px; text-transform: uppercase; color: #666;">Gustavo Martin</p>
      ${paragraphs}
      <p style="margin: 28px 0 0; font-size: 16px; line-height: 1.6; color: #333;">Gracias por leer,</p>
      <p style="margin: 0 0 4px; font-size: 16px; line-height: 1.6; color: #333;">Gustavo Martín</p>
      <p style="margin: 0 0 24px; font-size: 13px; letter-spacing: 0.5px; color: #666;">Mercado · Origen · Calidad · Crecimiento de proyectos de café</p>
      <p style="margin: 0 0 24px;">
        <a href="${LAST_EDITION_URL}" style="display: inline-block; background: #4b3f72; color: #fff; text-decoration: none; padding: 12px 22px; border-radius: 8px; font-size: 15px; font-weight: 600;">Leer la última edición →</a>
      </p>
      <p style="margin: 0; font-size: 14px;">
        <a href="${LAST_EDITION_URL}" style="color: #4b3f72;">gustavo-martin.com</a>
      </p>
    </div>
  `;

  const text = [
    ...WELCOME_LINES,
    "",
    "Gracias por leer,",
    "Gustavo Martín",
    "Mercado · Origen · Calidad · Crecimiento de proyectos de café",
    "",
    `Leer la última edición → ${LAST_EDITION_URL}`,
    "gustavo-martin.com",
  ].join("\n");

  return { html, text };
}
