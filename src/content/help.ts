import type { Text } from "../i18n";
// Who to call. Verified, national or California-wide, no login, and each one says
// what it is actually for so a scared 17-year-old does not have to guess.

import { HELP_TR } from "./translations";

export interface HelpLine {
  id: string;
  name: string;
  what: Text;
  phone?: string;
  text?: string;
  url: string;
  hours: Text;
  urgent?: boolean;
}

export const helpLines: HelpLine[] = [
  {
    id: "988",
    name: "988 Suicide & Crisis Lifeline",
    what: { en: "Whether you're facing mental health struggles, emotional distress, alcohol or drug use concerns, or just need someone to talk to, our caring counselors are here for you. You are not alone.", es: "Ya sea que estés enfrentando problemas de salud mental, angustia emocional, preocupaciones por el consumo de alcohol o drogas, o simplemente necesites hablar con alguien, nuestros consejeros compasivos están aquí para ti. No estás solo." },
    phone: "988",
    text: "988",
    url: "https://988lifeline.org/",
    hours: { en: "24/7, English and Spanish", es: "24/7, inglés y español" },
    urgent: true,
  },
  {
    id: "runaway",
    name: "National Runaway Safeline",
    what: { en: "Nowhere to sleep tonight, or thinking about leaving. They can find a shelter bed and a bus ride home.", es: "Sin lugar donde dormir esta noche, o pensando en irte. Pueden encontrar una cama en un albergue y un boleto de autobús." },
    phone: "1-800-786-2929",
    text: "66008",
    url: "https://www.1800runaway.org/",
    hours: { en: "24/7", es: "24/7" },
    urgent: true,
  },
  {
    id: "ombudsperson",
    name: "California Foster Care Ombudsperson",
    what: { en: "If a county child welfare agency is ignoring your Foster Youth Bill of Rights, refusing to return your calls, or making it impossible for you to re-enter extended foster care (AB 12)", es: "Ignoran un derecho tuyo, nadie te devuelve las llamadas, o quieres volver al cuidado y no logras contactar al condado. Ellos investigan." },
    phone: "1-877-846-1602",
    url: "https://fosteryouthhelp.ca.gov/",
    hours: { en: "Mon-Fri business hours", es: "Lun-Vie en horario de oficina" },
  },
  {
    id: "211",
    name: "211",
    what: { en: "Food, shelter, utilities, transportation, anything local. Tell them you are a former foster youth.", es: "Comida, albergue, servicios, transporte, cualquier cosa local. Diles que eres ex joven en cuidado adoptivo." },
    phone: "211",
    url: "https://www.211.org/",
    hours: { en: "24/7, many languages", es: "24/7, muchos idiomas" },
  },
  {
    id: "ilp",
    name: "Your county ILP coordinator",
    what: { en: "The ILP provides training, services, and benefits to assist current and former foster youth in achieving self-sufficiency prior to, and after leaving, the foster care system. They will help with housing, money for a deposit, college applications, documents. All counties have an ILP.", es: "La persona cuyo trabajo es ayudarte en la transición: vivienda, dinero para un depósito, solicitudes universitarias, documentos. Cada condado tiene uno." },
    url: "https://www.cdss.ca.gov/inforesources/foster-care/independent-living-program",
    hours: { en: "Business hours; list by county on the CDSS page", es: "Horario de oficina; lista por condado en la página del CDSS" },
  },
  {
    id: "jbay",
    name: "John Burton Advocates for Youth",
    what: { en: "Guides on THP-Plus, extended foster care, CalFresh, and college for foster youth, written for youth and advocates.", es: "Guías sobre THP-Plus, cuidado extendido, CalFresh y universidad para jóvenes en cuidado adoptivo." },
    url: "https://jbay.org/",
    hours: { en: "Website", es: "Sitio web" },
  },
  {
    id: "cyc",
    name: "California Youth Connection",
    what: { en: "Run by current and former foster youth. Chapters across the state; peers who have been through it.", es: "Dirigida por jóvenes actuales y ex jóvenes en cuidado adoptivo. Capítulos en todo el estado; compañeros que ya pasaron por esto." },
    url: "https://calyouthconn.org/",
    hours: { en: "Website", es: "Sitio web" },
  },
  {
    id: "ifoster",
    name: "iFoster",
    what: { en: "Free phones, laptops, and a jobs program for transition-age foster youth.", es: "Teléfonos y laptops gratis, y un programa de empleo para jóvenes en edad de transición." },
    url: "https://www.ifoster.org/",
    hours: { en: "Website", es: "Sitio web" },
  },
];

for (const h of helpLines) { const tr = HELP_TR[h.id]; if (tr) Object.assign(h.what, tr); }
