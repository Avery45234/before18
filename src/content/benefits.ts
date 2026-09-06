import type { Text } from "../i18n";
import type { Profile } from "../model/profile";
import { BENEFIT_TR } from "./translations";

// The rules. Every entry says where it came from and when I checked it. If a
// number in here is wrong, someone could make a bad decision, so: federal and
// California only, official sources only, and the app always says "confirm with
// your caseworker or ILP coordinator" next to anything with a deadline.

export interface Source {
  name: string;
  url: string;
  retrieved: string; // YYYY-MM-DD
}

export type Category = "money" | "health" | "housing" | "school" | "documents" | "rights";

// when a benefit opens/closes, in age. `atExit` means "when you leave care".
export interface AgeWindow {
  opens?: { years: number; months?: number } | "atExit";
  closes?: { years: number; months?: number } | "atExit";
  note?: string; // e.g. "under 26 on July 1 of the award year"
}

export interface Requirement {
  ok: boolean | "unsure";
  text: Text;
}

export interface Benefit {
  id: string;
  jurisdiction: "federal" | "california";
  category: Category;
  name: Text;
  summary: Text;
  window: AgeWindow;
  requirements: (p: Profile) => Requirement[];
  // what it is worth, so the What-if screen can put a number on a decision
  value?: { monthly?: number; oneTime?: number; perYear?: number; years?: number; note: string };
  howTo: (string | Text)[]; // short steps; strings are English-only, Text is translated
  sources: Source[];
  changed?: string; // a recent change the person should know about
}

const R = (ok: boolean | "unsure", en: string, es: string): Requirement => ({ ok, text: { en, es } });
const yn = (v: "yes" | "no" | "unsure"): boolean | "unsure" => (v === "unsure" ? "unsure" : v === "yes");

export const benefits: Benefit[] = [
  // ------------------------------------------------------------------ rights
  {
    id: "bill-of-rights",
    jurisdiction: "california",
    category: "rights",
    name: { en: "Foster Youth Bill of Rights", es: "Carta de Derechos de Jóvenes en Cuidado Adoptivo" },
    summary: {
      en: "While you are in care you have legal rights: a safe home, contact with family and siblings, your own phone calls and mail, medical and mental health care, your own belongings, your attorney and a court hearing.",
      es: "Mientras estés bajo cuidado tienes derechos legales: un hogar seguro, contacto con tu familia y hermanos, llamadas y correo privados, atención médica y de salud mental, tus pertenencias, tu abogado y una audiencia en la corte.",
    },
    window: { closes: { years: 21 }, note: "Applies the whole time you are in care, including extended foster care to 21" },
    requirements: (p) => [R(yn(p.inCareNow), "You are in foster care in California", "Estás en cuidado adoptivo en California")],
    howTo: [
      "Ask your social worker or attorney for the written list (they are required to give it to you).",
      "If a right is being ignored, call the California Foster Care Ombudsperson: 1-877-846-1602.",
    ],
    sources: [
      { name: "California Welfare & Institutions Code §16001.9", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=16001.9&lawCode=WIC", retrieved: "2026-09-06" },
      { name: "Foster Youth Rights - California Ombudsperson", url: "https://fosteryouthhelp.ca.gov/foster-youth-rights/", retrieved: "2026-09-06" },
    ],
  },
  {
    id: "rights-in-writing",
    jurisdiction: "federal",
    category: "rights",
    name: { en: "Your rights in writing, and a say in your plan", es: "Tus derechos por escrito y voz en tu plan" },
    summary: {
      en: "From age 14, your case plan must include a written list of your rights (education, health, visitation, court) and you get to help write the plan and pick two people to be on your team.",
      es: "Desde los 14 años, tu plan de caso debe incluir una lista escrita de tus derechos (educación, salud, visitas, corte) y puedes ayudar a escribir el plan y elegir a dos personas para tu equipo.",
    },
    window: { opens: { years: 14 } },
    requirements: (p) => [R(yn(p.inCareNow), "You are in foster care", "Estás en cuidado adoptivo")],
    howTo: ["At your next case plan meeting, ask to see the rights document and sign that you got it.", "You can name two adults (not your caseworker or foster parent) to be part of your planning team."],
    sources: [
      { name: "Preventing Sex Trafficking and Strengthening Families Act, P.L. 113-183 §113 (42 U.S.C. 675(5)(I))", url: "https://www.govtrack.us/congress/bills/113/hr4980/text", retrieved: "2026-09-06" },
      { name: "ACF Information Memorandum IM-14-03", url: "https://acf.gov/sites/default/files/documents/cb/im1403.pdf", retrieved: "2026-09-06" },
    ],
  },
  {
    id: "credit-report",
    jurisdiction: "federal",
    category: "documents",
    name: { en: "Free credit report every year (and help fixing it)", es: "Informe de crédito gratis cada año (y ayuda para corregirlo)" },
    summary: {
      en: "From 14 until you leave care, your agency must get your credit report every year and help you fix anything wrong on it. Identity theft against foster youth is common; this catches it early.",
      es: "Desde los 14 hasta que salgas del sistema, tu agencia debe obtener tu informe de crédito cada año y ayudarte a corregir errores. El robo de identidad a jóvenes en cuidado es común; esto lo detecta a tiempo.",
    },
    window: { opens: { years: 14 }, closes: "atExit" },
    requirements: (p) => [R(yn(p.inCareNow), "You are in foster care", "Estás en cuidado adoptivo")],
    howTo: ["Ask your caseworker: 'Have you pulled my credit report this year? Can I see it?'", "Anything you do not recognize is a problem to fix before you apply for an apartment."],
    sources: [{ name: "P.L. 113-183 §113 (42 U.S.C. 675(5)(I))", url: "https://www.govtrack.us/congress/bills/113/hr4980/text", retrieved: "2026-09-06" }],
  },
  {
    id: "school-of-origin",
    jurisdiction: "california",
    category: "school",
    name: { en: "Stay at your school when you move", es: "Quedarte en tu escuela cuando te mudas" },
    summary: {
      en: "If a placement change would move you, you have the right to stay at your current school, get transportation, and enroll immediately at a new school without records or paperwork.",
      es: "Si un cambio de hogar te obliga a mudarte, tienes derecho a quedarte en tu escuela actual, recibir transporte, e inscribirte de inmediato en una escuela nueva sin papeles ni expedientes.",
    },
    window: { closes: { years: 18 }, note: "K-12; through graduation" },
    requirements: (p) => [R(yn(p.inCareNow), "You are in foster care in California", "Estás en cuidado adoptivo en California")],
    howTo: ["Every school district has a foster youth liaison. Ask the front office for theirs.", "Say the words 'school of origin' - it is a legal term and staff will know what you mean."],
    sources: [{ name: "California Dept. of Education - Foster Youth Services (AB 490 rights)", url: "https://www.cde.ca.gov/ls/pf/fy/", retrieved: "2026-09-06" }],
  },

  // ------------------------------------------------------------------ 16-21
  {
    id: "ilp",
    jurisdiction: "california",
    category: "money",
    name: { en: "Independent Living Program (ILP)", es: "Programa de Vida Independiente (ILP)" },
    summary: {
      en: "From 16 to 21, county ILP offers classes, a transition plan, help with housing, jobs, college applications, and sometimes money for things like a laptop, a deposit, or a driver's license.",
      es: "De los 16 a los 21, el ILP del condado ofrece clases, un plan de transición, ayuda con vivienda, empleo, solicitudes universitarias y a veces dinero para cosas como una laptop, un depósito o la licencia de conducir.",
    },
    window: { opens: { years: 16 }, closes: { years: 21 } },
    requirements: (p) => [R(yn(p.inCareNow) === "unsure" ? "unsure" : yn(p.inCareNow) || yn(p.inCare16to18) === true, "You were in foster care (or probation placement) at 16 or later", "Estuviste en cuidado adoptivo (o colocación de probatoria) a los 16 o después")],
    howTo: ["Ask your caseworker for your county's ILP coordinator, or find the list on the CDSS ILP page.", "Ask what the ILP can pay for. Every county is a little different."],
    sources: [{ name: "CDSS - Independent Living Program", url: "https://www.cdss.ca.gov/inforesources/foster-care/independent-living-program", retrieved: "2026-09-06" }],
  },
  {
    id: "transition-plan",
    jurisdiction: "federal",
    category: "rights",
    name: { en: "Your transition plan meeting", es: "Tu reunión del plan de transición" },
    summary: {
      en: "In the 90 days before you turn 18 (or before you leave extended care), your agency must sit down with you and write a real plan: housing, health insurance, education, a job, a mentor, and how you will get your documents.",
      es: "En los 90 días antes de cumplir 18 (o antes de salir del cuidado extendido), tu agencia debe reunirse contigo y escribir un plan real: vivienda, seguro médico, educación, empleo, un mentor, y cómo obtendrás tus documentos.",
    },
    window: { opens: { years: 17, months: 9 }, closes: { years: 18 } },
    requirements: (p) => [R(yn(p.inCareNow), "You are in foster care", "Estás en cuidado adoptivo")],
    howTo: ["If you are 17 and nobody has scheduled this, ask your caseworker and your attorney to set it up.", "Bring the Documents checklist from this app to the meeting."],
    sources: [{ name: "CRS RL34499 - Youth Transitioning from Foster Care (transition plan requirement, 42 U.S.C. 675(5)(H))", url: "https://www.congress.gov/crs-product/RL34499", retrieved: "2026-09-06" }],
  },

  // ------------------------------------------------------------------ 18
  {
    id: "exit-documents",
    jurisdiction: "federal",
    category: "documents",
    name: { en: "Leave care with your documents", es: "Salir del sistema con tus documentos" },
    summary: {
      en: "When you leave care at 18 or older after at least 6 months in care, the agency must hand you: an official copy of your birth certificate, your Social Security card, your health insurance information, a copy of your medical records, and a state ID or driver's license.",
      es: "Cuando salgas del sistema a los 18 o más, después de al menos 6 meses en cuidado, la agencia debe entregarte: copia oficial de tu acta de nacimiento, tu tarjeta de Seguro Social, tu información de seguro médico, copia de tu expediente médico y una identificación estatal o licencia de conducir.",
    },
    window: { opens: "atExit" },
    requirements: (p) => [
      R(yn(p.sixMonthsInCare), "You were in care at least 6 months", "Estuviste en cuidado al menos 6 meses"),
      R(yn(p.inCareOn18), "You leave care at 18 or older", "Sales del sistema a los 18 o más"),
    ],
    howTo: ["Use the Documents checklist in this app. Do not sign your exit paperwork until you are holding them.", "Missing something? Ask your ILP coordinator - the county can often pay the fees."],
    sources: [{ name: "P.L. 113-183 §113 (42 U.S.C. 675(5)(I))", url: "https://www.govtrack.us/congress/bills/113/hr4980/text", retrieved: "2026-09-06" }],
  },
  {
    id: "efc",
    jurisdiction: "california",
    category: "housing",
    name: { en: "Extended Foster Care to 21 (AB 12)", es: "Cuidado Adoptivo Extendido hasta los 21 (AB 12)" },
    summary: {
      en: "You can stay in care until 21 with a placement and monthly support - including living on your own in a Supervised Independent Living Placement with about $1,301 a month paid to you. You just need to be doing one of five things: in high school, in college or job training, working 80+ hours a month, in a program that helps you get a job, or unable to because of a medical condition.",
      es: "Puedes quedarte en el sistema hasta los 21 con un hogar y apoyo mensual, incluso viviendo por tu cuenta en una colocación de vida independiente supervisada (SILP) con unos $1,301 al mes pagados a ti. Solo necesitas hacer una de cinco cosas: estar en la preparatoria, en la universidad o capacitación, trabajar 80+ horas al mes, estar en un programa que te ayude a conseguir empleo, o no poder por una condición médica.",
    },
    window: { opens: { years: 18 }, closes: { years: 21 } },
    requirements: (p) => [
      R(yn(p.inCareOn18), "You are in foster care (or probation placement) on your 18th birthday", "Estás en cuidado adoptivo (o colocación de probatoria) el día que cumples 18"),
      R(yn(p.inCareNow) === "unsure" ? "unsure" : true, "You sign a Mutual Agreement (SOC 162) and meet one of the five conditions", "Firmas un Acuerdo Mutuo (SOC 162) y cumples una de las cinco condiciones"),
    ],
    value: { monthly: 1301, years: 3, note: "SILP basic rate effective July 1, 2025. Your placement type may pay differently." },
    howTo: ["Before your 18th birthday, tell your caseworker and attorney: 'I want to stay in extended foster care.'", "Ask about a SILP if you want your own place. The monthly payment goes to you.", "If you leave and change your mind, you can come back any time before 21 (see Re-entry)."],
    sources: [
      { name: "CDSS - Extended Foster Care (AB 12)", url: "https://www.cdss.ca.gov/inforesources/foster-care/extended-foster-care-ab-12", retrieved: "2026-09-06" },
      { name: "Santa Clara County SSA - 2025 foster care rates (SILP basic rate $1,301, eff. 7/1/2025)", url: "https://stgenssa.sccgov.org/debs/program_handbooks/charts/assets/3FosterCare/2025_Rates.htm", retrieved: "2026-09-06" },
      { name: "Children's Law Center of California - AB 12", url: "https://www.clccal.org/resources/youth-resources/ab12/", retrieved: "2026-09-06" },
    ],
  },
  {
    id: "efc-reentry",
    jurisdiction: "california",
    category: "housing",
    name: { en: "Re-enter extended foster care any time before 21", es: "Volver al cuidado extendido en cualquier momento antes de los 21" },
    summary: {
      en: "Left at 18 and things are not working? You can come back. Sign a Voluntary Re-entry Agreement (SOC 163) with the county, meet one of the five conditions, and your placement and monthly support restart.",
      es: "¿Saliste a los 18 y las cosas no funcionan? Puedes volver. Firma un Acuerdo de Reingreso Voluntario (SOC 163) con el condado, cumple una de las cinco condiciones, y tu hogar y apoyo mensual se reanudan.",
    },
    window: { opens: { years: 18 }, closes: { years: 21 } },
    requirements: (p) => [R(yn(p.inCareOn18), "You were in care on your 18th birthday", "Estabas en cuidado el día que cumpliste 18")],
    howTo: ["Call your old county child welfare office (or the Ombudsperson if you cannot reach anyone) and say you want to re-enter under AB 12.", "You do not need a reason and you do not need to explain why you left."],
    sources: [{ name: "CDSS - Extended Foster Care (AB 12)", url: "https://www.cdss.ca.gov/inforesources/foster-care/extended-foster-care-ab-12", retrieved: "2026-09-06" }],
  },
  {
    id: "medi-cal-26",
    jurisdiction: "federal",
    category: "health",
    name: { en: "Free Medi-Cal until 26", es: "Medi-Cal gratis hasta los 26" },
    summary: {
      en: "If you were in foster care on your 18th birthday - in any state - and you live in California, you get full, free Medi-Cal until you turn 26. No income limit. You do not have to prove you were in care; you can self-attest.",
      es: "Si estabas en cuidado adoptivo el día que cumpliste 18, en cualquier estado, y vives en California, recibes Medi-Cal completo y gratis hasta los 26. Sin límite de ingresos. No tienes que comprobar que estuviste en cuidado; puedes declararlo tú mismo.",
    },
    window: { opens: { years: 18 }, closes: { years: 26 } },
    requirements: (p) => [
      R(yn(p.inCareOn18), "You were in foster care on your 18th birthday (any state)", "Estabas en cuidado adoptivo el día que cumpliste 18 (cualquier estado)"),
      R(p.state === "CA", "You live in California", "Vives en California"),
    ],
    value: { years: 8, note: "Full-scope coverage with no premium and no share of cost." },
    howTo: ["If you are leaving care, ask that your Medi-Cal be switched to the Former Foster Youth program before you go.", "If it lapsed: fill out form MC 250A (Medi-Cal for Former Foster Care Youth) at any county office, or apply at benefitscal.com and check the former foster youth box."],
    sources: [{ name: "DHCS - Former Foster Youth Program FAQ", url: "https://www.dhcs.ca.gov/services/medi-cal-resources/medi-cal-eligibility-division/frequently-asked-questions-for-the-former-foster-youth-program/", retrieved: "2026-09-06" }],
  },

  // ------------------------------------------------------------------ school & money
  {
    id: "fafsa-independent",
    jurisdiction: "federal",
    category: "school",
    name: { en: "FAFSA: you count as independent", es: "FAFSA: cuentas como estudiante independiente" },
    summary: {
      en: "If you were in foster care at any time since turning 13, the FAFSA does not ask for a parent's income or signature. That usually means the maximum Pell Grant (up to $7,395 a year) plus state aid. File it - it unlocks almost everything else on this list.",
      es: "Si estuviste en cuidado adoptivo en cualquier momento desde los 13 años, la FAFSA no pide ingresos ni firma de un padre. Eso normalmente significa la Beca Pell máxima (hasta $7,395 al año) más ayuda estatal. Llénala: abre casi todo lo demás en esta lista.",
    },
    window: { opens: { years: 17 }, note: "Opens October 1 each year for the following school year" },
    requirements: (p) => [R(yn(p.inCareAfter13), "You were in foster care at any time on or after your 13th birthday", "Estuviste en cuidado adoptivo en cualquier momento desde tu cumpleaños número 13")],
    value: { perYear: 7395, note: "Maximum Federal Pell Grant, 2025-26 award year." },
    howTo: ["Go to studentaid.gov, make an FSA ID, and answer 'yes' to the question about being in foster care since age 13.", "No Social Security number? Use the California Dream Act Application (CADAA) at csac.ca.gov instead.", "Ask your ILP coordinator or a college's foster youth program to sit with you while you do it."],
    sources: [
      { name: "Federal Student Aid - Dependency status", url: "https://studentaid.gov/apply-for-aid/fafsa/filling-out/dependency", retrieved: "2026-09-06" },
      { name: "Federal Student Aid - Pell Grant amounts", url: "https://studentaid.gov/understand-aid/types/grants/pell", retrieved: "2026-09-06" },
    ],
  },
  {
    id: "chafee-grant",
    jurisdiction: "california",
    category: "money",
    name: { en: "Chafee Grant: up to $5,000 a year for school", es: "Beca Chafee: hasta $5,000 al año para estudiar" },
    summary: {
      en: "Free money for college or job training, on top of other aid, for up to five years - as long as you are under 26 on July 1 of the school year. For 2025-26 the award is $4,500. You were eligible if you were in foster care at any point between 16 and 18.",
      es: "Dinero gratis para la universidad o capacitación, además de otras ayudas, hasta por cinco años, siempre que tengas menos de 26 el 1 de julio del año escolar. Para 2025-26 el monto es $4,500. Eres elegible si estuviste en cuidado adoptivo en algún momento entre los 16 y los 18.",
    },
    window: { opens: { years: 17 }, closes: { years: 26 }, note: "Must be under 26 on July 1 of the award year; max 5 years of awards" },
    requirements: (p) => [
      R(yn(p.inCare16to18), "You were in foster care (dependent or ward) at some point between 16 and 18", "Estuviste en cuidado adoptivo (dependiente o bajo tutela) en algún momento entre los 16 y 18"),
      R("unsure", "You filed the FAFSA or CADAA and enroll at least half time", "Presentaste la FAFSA o CADAA y te inscribes al menos medio tiempo"),
    ],
    value: { perYear: 5000, years: 5, note: "Up to $5,000 per year; 2025-26 awards set at $4,500. Paid first-come, first-served." },
    howTo: ["Apply once at chafee.csac.ca.gov. Do not apply twice - it slows things down.", "Apply early in the year. Money runs out because it is first-come, first-served."],
    sources: [{ name: "California Student Aid Commission - Chafee Grant", url: "https://www.csac.ca.gov/chafee", retrieved: "2026-09-06" }],
  },
  {
    id: "nextup",
    jurisdiction: "california",
    category: "school",
    name: { en: "NextUp at any California community college", es: "NextUp en cualquier colegio comunitario de California" },
    summary: {
      en: "A program just for students with foster care history: a counselor who knows the system, priority registration, help with books, food, transportation, and emergency money. You qualify if you were in care at any point after 13 and are 26 or younger when you first join.",
      es: "Un programa solo para estudiantes con historial de cuidado adoptivo: un consejero que conoce el sistema, inscripción prioritaria, ayuda con libros, comida, transporte y dinero de emergencia. Calificas si estuviste en cuidado en algún momento después de los 13 y tienes 26 o menos cuando te unes por primera vez.",
    },
    window: { opens: { years: 17 }, closes: { years: 26 }, note: "Join before 26; services can continue after" },
    requirements: (p) => [R(yn(p.inCareAfter13), "You were in foster care at any time on or after your 13th birthday", "Estuviste en cuidado adoptivo en cualquier momento desde los 13 años")],
    howTo: ["Search '[college name] NextUp' or ask the financial aid office for the foster youth program.", "Sign up before your first semester so priority registration kicks in."],
    sources: [{ name: "California Community Colleges - NextUp", url: "https://icangotocollege.com/financial-aid/foster-youth-support", retrieved: "2026-09-06" }],
  },
  {
    id: "priority-reg",
    jurisdiction: "california",
    category: "school",
    name: { en: "Priority class registration (AB 194)", es: "Inscripción prioritaria en clases (AB 194)" },
    summary: {
      en: "At California community colleges and CSU campuses, current foster youth and former foster youth up to age 24 register for classes before everyone else, so you actually get the classes you need to finish.",
      es: "En los colegios comunitarios de California y las CSU, los jóvenes en cuidado adoptivo y los ex jóvenes en cuidado hasta los 24 años se inscriben en clases antes que todos los demás.",
    },
    window: { opens: { years: 17 }, closes: { years: 24 } },
    requirements: (p) => [R(yn(p.inCareAfter13), "You are or were in foster care", "Estás o estuviste en cuidado adoptivo")],
    howTo: ["Tell the admissions or foster youth office you are a former foster youth. You may need a letter from your caseworker or ILP."],
    sources: [{ name: "AB 194 (2011) - Priority enrollment for foster youth", url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201120120AB194", retrieved: "2026-09-06" }],
  },
  {
    id: "thp-plus",
    jurisdiction: "california",
    category: "housing",
    name: { en: "THP-Plus housing, 18 to 25", es: "Vivienda THP-Plus, de 18 a 25" },
    summary: {
      en: "Transitional housing with support services for former foster youth ages 18 to 25, for up to 36 months. If extended foster care ends or is not an option, this is the next door to knock on.",
      es: "Vivienda de transición con servicios de apoyo para ex jóvenes en cuidado adoptivo de 18 a 25 años, hasta por 36 meses. Si el cuidado extendido termina o no es opción, esta es la siguiente puerta a tocar.",
    },
    window: { opens: { years: 18 }, closes: { years: 25 }, note: "Up to 36 months total" },
    requirements: (p) => [R(yn(p.inCareOn18), "You aged out of foster care (or probation placement) at 18 or older", "Saliste del cuidado adoptivo (o colocación de probatoria) a los 18 o más")],
    howTo: ["Ask your county ILP coordinator which THP-Plus providers serve your county and whether there is a waitlist.", "Apply before extended foster care ends, not after."],
    sources: [{ name: "Youth Law Center - THP-Plus Program Expansion (age 25, 36 months, eff. July 1, 2022)", url: "https://www.ylc.org/resource/policy-alert-thp-plus-program-expansion-a-resource-for-current-and-former-foster-youth-in-california/", retrieved: "2026-09-06" }],
  },
  {
    id: "calfresh",
    jurisdiction: "federal",
    category: "money",
    name: { en: "CalFresh (food money)", es: "CalFresh (dinero para comida)" },
    summary: {
      en: "Monthly money for groceries. Young adults in extended foster care or foster youth college programs are usually exempt from the student rules that block other students. Heads up: a July 2025 federal law removed the automatic work-rule exemption former foster youth under 25 used to have, so ask your county what applies to you now.",
      es: "Dinero mensual para comida. Los jóvenes en cuidado extendido o en programas universitarios para jóvenes en cuidado normalmente están exentos de las reglas de estudiante que bloquean a otros. Atención: una ley federal de julio de 2025 eliminó la exención automática de reglas de trabajo que tenían los ex jóvenes en cuidado menores de 25; pregunta en tu condado qué aplica ahora.",
    },
    window: { opens: { years: 18 } },
    requirements: (p) => [R(yn(p.inCareOn18), "You were in care at 18 (helps with exemptions; not required to apply)", "Estabas en cuidado a los 18 (ayuda con exenciones; no es requisito para solicitar)")],
    changed: "P.L. 119-21 (signed July 4, 2025) removed the former-foster-youth exemption from SNAP time limits for people under 25. California has asked for exemptions. Rules may differ by the time you read this.",
    howTo: ["Apply at getcalfresh.org (takes about 10 minutes).", "If you are a student, tell them you are in extended foster care / NextUp / Guardian Scholars - that can exempt you from the student rule."],
    sources: [
      { name: "The Imprint - California bill would support food stamps for former foster youth (on P.L. 119-21)", url: "https://imprintnews.org/top-stories/california-lawmakers-looking-to-avoid-foster-youth-going-hungry/274537", retrieved: "2026-09-06" },
      { name: "LSNC Guide to CalFresh - Special rules for students", url: "https://calfresh.guide/special-rules-for-students/", retrieved: "2026-09-06" },
    ],
  },
];

// fold in the Vietnamese / Chinese names and summaries and the Spanish how-to steps
for (const b of benefits) {
  const tr = BENEFIT_TR[b.id];
  if (!tr) continue;
  if (tr.name) Object.assign(b.name, tr.name);
  if (tr.summary) Object.assign(b.summary, tr.summary);
  if (tr.howTo) b.howTo = b.howTo.map((step, i) => (typeof step === "string" && tr.howTo![i] ? { en: step, es: tr.howTo![i] } : step));
}

export function benefitById(id: string): Benefit | undefined {
  return benefits.find((b) => b.id === id);
}
