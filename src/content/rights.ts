// The rights card. Short, in plain words, with the law behind each one so a young
// person can show a caseworker, a foster parent, or a school and not be argued with.

import { RIGHTS_TR } from "./translations";

export interface Right {
  en: string;
  es: string;
  vi?: string;
  zh?: string;
  law: string; // where it comes from
  url: string;
}

export const californiaRights: Right[] = [
  {
    en: "To live in a safe, healthy, comfortable home where you are treated with respect.",
    es: "Vivir en un hogar seguro, saludable y cómodo donde te traten con respeto.",
    law: "WIC §16001.9(a)(1)",
    url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=16001.9&lawCode=WIC",
  },
  {
    en: "To be free from physical, sexual, or emotional abuse, corporal punishment, and exploitation.",
    es: "Estar libre de abuso físico, sexual o emocional, castigo corporal y explotación.",
    law: "WIC §16001.9(a)(2)",
    url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=16001.9&lawCode=WIC",
  },
  {
    en: "To get enough healthy food and clothing, and an allowance if you live in a group setting.",
    es: "Recibir comida saludable suficiente y ropa, y una mesada si vives en un hogar grupal.",
    law: "WIC §16001.9(a)(3)",
    url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=16001.9&lawCode=WIC",
  },
  {
    en: "To medical, dental, vision, and mental health care - and to not be given medication unless a doctor authorized it.",
    es: "Recibir atención médica, dental, de la vista y de salud mental, y no recibir medicamentos sin autorización de un médico.",
    law: "WIC §16001.9(a)(4)-(5)",
    url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=16001.9&lawCode=WIC",
  },
  {
    en: "To contact family, siblings, your social worker, your attorney, your CASA, and foster youth advocates - and to visit siblings privately unless a court says otherwise.",
    es: "Contactar a tu familia, hermanos, trabajador social, abogado, CASA y defensores de jóvenes, y visitar a tus hermanos en privado a menos que la corte diga lo contrario.",
    law: "WIC §16001.9(a)(6), (8)",
    url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=16001.9&lawCode=WIC",
  },
  {
    en: "To make and receive private phone calls and electronic messages, and to send and receive unopened mail.",
    es: "Hacer y recibir llamadas y mensajes electrónicos privados, y enviar y recibir correo sin abrir.",
    law: "WIC §16001.9(a)(9)",
    url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=16001.9&lawCode=WIC",
  },
  {
    en: "To have friends, coaches, teachers, mentors, and a life outside the foster care system.",
    es: "Tener amigos, entrenadores, maestros, mentores y una vida fuera del sistema de cuidado adoptivo.",
    law: "WIC §16001.9(a)(10)",
    url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=16001.9&lawCode=WIC",
  },
  {
    en: "To stay at your school when your placement changes, with transportation, and to enroll immediately at a new school without records.",
    es: "Quedarte en tu escuela cuando cambie tu hogar, con transporte, e inscribirte de inmediato en una escuela nueva sin expedientes.",
    law: "Ed. Code §48853.5 (AB 490)",
    url: "https://www.cde.ca.gov/ls/pf/fy/",
  },
  {
    en: "From 14: a written list of your rights and a real say in your case plan, including two adults you choose for your team.",
    es: "Desde los 14: una lista escrita de tus derechos y voz real en tu plan de caso, incluyendo dos adultos que tú elijas para tu equipo.",
    law: "42 U.S.C. §675(5)(C)(iv), (I) - P.L. 113-183",
    url: "https://www.govtrack.us/congress/bills/113/hr4980/text",
  },
  {
    en: "A transition plan meeting in the 90 days before you turn 18 or leave extended care - housing, health insurance, school, work, a mentor.",
    es: "Una reunión de plan de transición en los 90 días antes de cumplir 18 o salir del cuidado extendido: vivienda, seguro médico, escuela, trabajo, un mentor.",
    law: "42 U.S.C. §675(5)(H)",
    url: "https://www.congress.gov/crs-product/RL34499",
  },
  {
    en: "When you leave care at 18+, to be handed your birth certificate, Social Security card, health insurance info, medical records, and a state ID or license.",
    es: "Al salir del sistema a los 18 o más, recibir tu acta de nacimiento, tarjeta de Seguro Social, información de seguro médico, expediente médico y una identificación estatal o licencia.",
    law: "42 U.S.C. §675(5)(I) - P.L. 113-183",
    url: "https://www.govtrack.us/congress/bills/113/hr4980/text",
  },
  {
    en: "To stay in extended foster care until 21, and to come back any time before 21 if you leave.",
    es: "Quedarte en cuidado extendido hasta los 21, y volver en cualquier momento antes de los 21 si te vas.",
    law: "AB 12 - WIC §11400 et seq.",
    url: "https://www.cdss.ca.gov/inforesources/foster-care/extended-foster-care-ab-12",
  },
];

RIGHTS_TR.forEach((tr, i) => { if (californiaRights[i]) Object.assign(californiaRights[i], tr); });
