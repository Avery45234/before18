import type { Text } from "../i18n";

// The About page, as plain sections in English and Spanish. Edit the words here;
// the page just prints them in order. The "Sources" section is built from
// benefits.ts automatically and the extra sources below are added to the end.

export const aboutSections: { title: Text; body: Text }[] = [
  {
    title: { en: "The problem", es: "El problema" },
    body: {
      en: "About 20,000 young people age out of foster care in the United States every year. Roughly one in five is homeless the day they leave, and 40 to 50 percent within eighteen months. Much of that is avoidable: federal and California law give these young people a placement and a monthly payment until 21, free health coverage until 26, thousands of dollars a year for school, and the right to leave care holding their own birth certificate, Social Security card, and ID. Each of those has an age or a date attached, and a lot of them turn on a single fact: were you in care on your 18th birthday? Most young people never get that explained to them. This app explains it, for one specific person, with the dates.",
      es: "Cada año unos 20,000 jóvenes salen del sistema de cuidado adoptivo en Estados Unidos al cumplir la mayoría de edad. Cerca de uno de cada cinco queda sin hogar el mismo día que sale, y entre el 40 y el 50 por ciento en los siguientes dieciocho meses. Gran parte de eso se puede evitar: la ley federal y la de California les dan un hogar y un pago mensual hasta los 21, cobertura médica gratis hasta los 26, miles de dólares al año para estudiar, y el derecho a salir con su acta de nacimiento, su tarjeta de Seguro Social y su identificación en la mano. Cada una de esas cosas tiene una edad o una fecha, y muchas dependen de un solo hecho: ¿estabas en el sistema el día que cumpliste 18? A la mayoría nunca se lo explican. Esta app lo explica, para una persona en concreto, con las fechas.",
    },
  },
  {
    title: { en: "How it works", es: "Cómo funciona" },
    body: {
      en: "You answer a few questions on your own phone. The app builds a timeline from your birthdate and the rules, tells you what is open now, what opens and closes when, and what you are not eligible for and why. The What if screen runs the same rules with one decision changed and shows what falls off the list, with a dollar estimate where one is honest to give. Nothing is sent anywhere. There is no account. It works with no signal once it has loaded once.",
      es: "Respondes unas preguntas en tu propio teléfono. La app arma una línea de tiempo con tu fecha de nacimiento y las reglas, te dice qué está abierto ahora, qué se abre y se cierra cuándo, y para qué no calificas y por qué. La pantalla ¿Qué pasa si...? corre las mismas reglas con una decisión cambiada y muestra qué se cae de la lista, con un estimado en dólares cuando es honesto darlo. Nada se envía a ningún lado. No hay cuenta. Funciona sin señal después de cargarse una vez.",
    },
  },
  {
    title: { en: "Accuracy", es: "Exactitud" },
    body: {
      en: "Scope is federal law plus California. Every rule links to the official source it came from and the date it was checked. Dollar amounts (the SILP rate, the Chafee Grant, the Pell maximum) are the published figures for 2025-26 and will change. Rules change too, sometimes fast: CalFresh work rules for former foster youth changed in July 2025. This app is a map, not legal advice. Confirm anything with a deadline with your caseworker, your attorney, or your county ILP coordinator, and call the California Foster Care Ombudsperson (1-877-846-1602) if nobody will answer you.",
      es: "El alcance es la ley federal más la de California. Cada regla enlaza a la fuente oficial de donde salió y la fecha en que se revisó. Los montos en dólares (la tarifa SILP, la beca Chafee, el máximo de Pell) son las cifras publicadas para 2025-26 y van a cambiar. Las reglas también cambian, a veces rápido: las reglas de trabajo de CalFresh para ex jóvenes en cuidado cambiaron en julio de 2025. Esta app es un mapa, no asesoría legal. Confirma cualquier cosa con fecha límite con tu trabajador social, tu abogado o el coordinador del ILP de tu condado, y llama a la Ombudsperson de Cuidado Adoptivo de California (1-877-846-1602) si nadie te responde.",
    },
  },
  {
    title: { en: "Technical notes", es: "Notas técnicas" },
    body: {
      en: "TypeScript, React, and Vite. The rules live in plain data files with sources attached; the timeline and what-if engines are pure functions with unit tests (date math, eligibility, the consequence calculator). Four languages (English, Spanish, Vietnamese, Chinese); the Vietnamese and Chinese are first drafts awaiting a native speaker's review, and anything untranslated is labeled and shown in English. County ILP, extended foster care, and THP-Plus contacts for all 58 counties are bundled from the CDSS list with the date they were pulled. Installable as an offline web app; deployed from GitHub Pages.",
      es: "TypeScript, React y Vite. Las reglas viven en archivos de datos simples con sus fuentes; los motores de la línea de tiempo y de ¿qué pasa si...? son funciones puras con pruebas unitarias (cálculo de fechas, elegibilidad, la calculadora de consecuencias). Cuatro idiomas (inglés, español, vietnamita y chino); el vietnamita y el chino son primeros borradores pendientes de revisión por un hablante nativo, y lo que no está traducido se marca y se muestra en inglés. Los contactos del ILP, del cuidado extendido y de THP-Plus de los 58 condados vienen de la lista del CDSS con la fecha en que se descargaron. Se instala como app web sin conexión; se publica desde GitHub Pages.",
    },
  },
  {
    title: { en: "AI use and authorship", es: "Uso de IA y autoría" },
    body: {
      en: "I planned this app and sketched every screen, and I used AI tools in a supporting role to build it. The Congressional App Challenge asks for that to be disclosed fully. Claude (Anthropic) helped solve techincal problems and translate into Spanish, Vietnamese, and Chinese. ChatGPT made the logo artwork from my description. I chose the problem and the scope, decided what the app should do and how it should look, created/reviewed and changed the code. The complete record is in AI_ASSISTANCE_LOG.md in the repository, next to the git history.",
      es: "Planeé esta app y dibujé cada pantalla, y usé herramientas de IA como apoyo para construirla. El Congressional App Challenge pide que eso se declare por completo. Claude (Anthropic) ayudó a resolver problemas técnicos y a traducir al español, vietnamita y chino. ChatGPT hizo el logotipo a partir de mi descripción. Yo elegí el problema y el alcance, decidí qué hace la app y cómo se ve, y creé, revisé y cambié el código. El registro completo está en AI_ASSISTANCE_LOG.md en el repositorio, junto al historial de git.",
    },
  },
];

export const extraSources: { name: string; url: string; note: Text }[] = [
  { name: "Nicole Childers, TODAY (2022): aging out of foster care in California", url: "https://www.today.com/parents/essay/foster-care-aging-out-homelessness-rcna53014", note: { en: "the essay that started this project", es: "el ensayo que dio origen a este proyecto" } },
  { name: "Human Rights Watch, My So-Called Emancipation (2010)", url: "https://www.hrw.org/report/2010/05/12/my-so-called-emancipation/foster-care-homelessness-california-youth", note: { en: "quotes and California statistics", es: "citas y estadísticas de California" } },
  { name: "California Policy Lab, Aging Out of Foster Care in Los Angeles (2024)", url: "https://capolicylab.org/aging-out-of-foster-care-in-los-angeles/", note: { en: "the 1 in 4 figure", es: "la cifra de 1 de cada 4" } },
  { name: "CAFO, U.S. Foster Care Statistics", url: "https://cafo.org/foster-care-statistics/", note: { en: "", es: "" } },
  { name: "Finally Family Homes, Aging Out statistics", url: "https://finallyfamilyhomes.org/the-problem/", note: { en: "", es: "" } },
];

export const aboutFooter: Text = {
  en: "Congressional App Challenge 2026 · This app does not collect or transmit any personal information.",
  es: "Congressional App Challenge 2026 · Esta app no recopila ni envía ninguna información personal.",
};
