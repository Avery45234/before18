import type { Text } from "../i18n";

// Messages a young person can send as they are. Each one is short, names the law
// once, asks for one specific thing, and ends with a date. A message with a date
// on it is a record, and a record is what makes people move.
//
// Placeholders: {name} {caseworker} {county} {date} {birthdate}. Anything in
// [brackets] is for the person to fill in by hand.

export interface Letter {
  id: string;
  title: Text;
  when: Text; // the moment this is for
  to: Text; // who receives it
  subject: Text;
  body: Text;
  source: { name: string; url: string };
}

export const letters: Letter[] = [
  {
    id: "stay",
    title: { en: "I want to stay in extended foster care", es: "Quiero quedarme en el cuidado extendido" },
    when: { en: "Any time before your 18th birthday, and again if nobody answers.", es: "En cualquier momento antes de cumplir 18, y otra vez si nadie responde." },
    to: { en: "Your caseworker (copy your attorney)", es: "Tu trabajador social (con copia a tu abogado)" },
    subject: { en: "Staying in extended foster care after 18", es: "Quedarme en el cuidado extendido después de los 18" },
    body: {
      en: `Hi {caseworker},

I am writing to say clearly that I want to stay in extended foster care after I turn 18 on {birthdate}. Please do not close my case on or before my 18th birthday.

I understand I need to meet one of the five conditions (school, work, a program that removes barriers to work, a medical condition, or 80 hours a month of work). I want to go over which one fits me, and I want to sign the Mutual Agreement (SOC 162) before my birthday.

Please reply with the date of my transition plan meeting and send me a copy of my case plan. I would like my attorney there.

Thank you,
{name}
{date}`,
      es: `Hola {caseworker}:

Escribo para decir con claridad que quiero quedarme en el cuidado extendido después de cumplir 18 años el {birthdate}. Por favor no cierren mi caso el día de mis 18 ni antes.

Entiendo que debo cumplir una de las cinco condiciones (escuela, trabajo, un programa que elimine barreras al empleo, una condición médica, o 80 horas de trabajo al mes). Quiero revisar cuál me corresponde y quiero firmar el Acuerdo Mutuo (SOC 162) antes de mi cumpleaños.

Por favor responde con la fecha de mi reunión del plan de transición y envíame una copia de mi plan de caso. Quiero que mi abogado esté presente.

Gracias,
{name}
{date}`,
    },
    source: { name: "CDSS, Extended Foster Care (AB 12)", url: "https://www.cdss.ca.gov/inforesources/foster-care/extended-foster-care-ab-12" },
  },
  {
    id: "reenter",
    title: { en: "I left and I want to come back", es: "Me fui y quiero volver" },
    when: { en: "Any time before you turn 21. You do not have to explain why you left.", es: "En cualquier momento antes de cumplir 21. No tienes que explicar por qué te fuiste." },
    to: { en: "Your last caseworker, or the county's re-entry contact", es: "Tu último trabajador social, o el contacto de reingreso del condado" },
    subject: { en: "Re-entering extended foster care", es: "Reingreso al cuidado extendido" },
    body: {
      en: `Hi {caseworker},

I left extended foster care and I want to come back. I am under 21 (born {birthdate}), so I am eligible to re-enter under AB 12.

Please send me the Voluntary Re-entry Agreement (SOC 163) or tell me where I can sign it, and let me know what happens next for a placement and payments.

If you are not the right person for this, please forward this message to the re-entry contact for {county} County and copy me.

Thank you,
{name}
{date}`,
      es: `Hola {caseworker}:

Salí del cuidado extendido y quiero volver. Tengo menos de 21 años (nací el {birthdate}), así que puedo reingresar bajo la ley AB 12.

Por favor envíame el Acuerdo Voluntario de Reingreso (SOC 163) o dime dónde puedo firmarlo, y explícame qué sigue para una colocación y los pagos.

Si no eres la persona indicada, por favor reenvía este mensaje al contacto de reingreso del condado de {county} y ponme en copia.

Gracias,
{name}
{date}`,
    },
    source: { name: "CDSS, Extended Foster Care re-entry (SOC 163)", url: "https://www.cdss.ca.gov/inforesources/foster-care/extended-foster-care-ab-12" },
  },
  {
    id: "docs",
    title: { en: "I need my documents before I sign out", es: "Necesito mis documentos antes de firmar mi salida" },
    when: { en: "The month before your case closes. Before you sign anything.", es: "El mes antes de que cierre tu caso. Antes de firmar cualquier cosa." },
    to: { en: "Your caseworker", es: "Tu trabajador social" },
    subject: { en: "My documents before my case closes", es: "Mis documentos antes de que cierre mi caso" },
    body: {
      en: `Hi {caseworker},

Before my case closes I need the documents federal law says I receive when I leave care (42 U.S.C. 675(5)(I)): my certified birth certificate, my Social Security card, a California ID or driver's license, my health insurance information, and a copy of my medical records.

Please tell me which of these you have right now and the date I will receive the rest. I will not sign my exit paperwork until I have them.

Thank you,
{name}
{date}`,
      es: `Hola {caseworker}:

Antes de que cierre mi caso necesito los documentos que la ley federal dice que recibo al salir del sistema (42 U.S.C. 675(5)(I)): mi acta de nacimiento certificada, mi tarjeta de Seguro Social, una identificación de California o licencia de conducir, mi información de seguro médico y una copia de mi expediente médico.

Por favor dime cuáles tienes ahora mismo y la fecha en que recibiré el resto. No firmaré mis papeles de salida hasta tenerlos.

Gracias,
{name}
{date}`,
    },
    source: { name: "42 U.S.C. 675(5)(I), P.L. 113-183", url: "https://www.govtrack.us/congress/bills/113/hr4980/text" },
  },
  {
    id: "verify",
    title: { en: "Prove I was in foster care (for FAFSA, Chafee, NextUp)", es: "Comprobar que estuve en cuidado adoptivo (FAFSA, Chafee, NextUp)" },
    when: { en: "Senior year, before financial aid deadlines. Ask while your caseworker still has your file open.", es: "El último año de preparatoria, antes de las fechas límite de ayuda financiera. Pide esto mientras tu expediente siga abierto." },
    to: { en: "Your caseworker or your attorney", es: "Tu trabajador social o tu abogado" },
    subject: { en: "Verification of foster care letter", es: "Carta de verificación de cuidado adoptivo" },
    body: {
      en: `Hi {caseworker},

I am applying for financial aid. Please send me a letter on agency letterhead confirming that I was in foster care in California, with the dates, and stating that I was in care at or after age 13 (and between 16 and 18, if that applies to me).

This is for the FAFSA, the Chafee Grant, NextUp, and college priority registration. A copy of my dependency court order works too.

Thank you,
{name}
{date}`,
      es: `Hola {caseworker}:

Estoy solicitando ayuda financiera. Por favor envíame una carta con membrete de la agencia que confirme que estuve en cuidado adoptivo en California, con las fechas, y que indique que estuve en el sistema a los 13 años o después (y entre los 16 y 18, si aplica).

Es para la FAFSA, la beca Chafee, NextUp y la inscripción prioritaria en la universidad. También sirve una copia de mi orden de la corte de dependencia.

Gracias,
{name}
{date}`,
    },
    source: { name: "California Student Aid Commission, Chafee Grant", url: "https://www.csac.ca.gov/chafee" },
  },
  {
    id: "school",
    title: { en: "I want to stay at my school", es: "Quiero quedarme en mi escuela" },
    when: { en: "The day you hear your placement is changing.", es: "El día que te enteres de que cambiará tu hogar." },
    to: { en: "Your school district's foster youth liaison (copy your caseworker)", es: "El enlace de jóvenes en cuidado adoptivo de tu distrito escolar (con copia a tu trabajador social)" },
    subject: { en: "Staying at my school of origin", es: "Quedarme en mi escuela de origen" },
    body: {
      en: `Hello,

I am a student in foster care and my placement is changing. Under Education Code 48853.5 (AB 490), I have the right to stay at my current school for the rest of the school year, with transportation.

I want to stay at my school. Please confirm this in writing and tell me who is arranging my transportation. My social worker is {caseworker}.

Thank you,
{name}
{date}`,
      es: `Hola:

Soy estudiante en cuidado adoptivo y mi hogar va a cambiar. Según el Código de Educación 48853.5 (AB 490), tengo derecho a quedarme en mi escuela actual el resto del año escolar, con transporte.

Quiero quedarme en mi escuela. Por favor confírmalo por escrito y dime quién organizará mi transporte. Mi trabajador social es {caseworker}.

Gracias,
{name}
{date}`,
    },
    source: { name: "California Dept. of Education, Foster Youth Services", url: "https://www.cde.ca.gov/ls/pf/fy/" },
  },
  {
    id: "credit",
    title: { en: "Show me my credit report", es: "Muéstrenme mi informe de crédito" },
    when: { en: "Once a year from 14. Especially before you rent a place.", es: "Una vez al año desde los 14. Sobre todo antes de rentar un lugar." },
    to: { en: "Your caseworker", es: "Tu trabajador social" },
    subject: { en: "My annual credit report", es: "Mi informe de crédito anual" },
    body: {
      en: `Hi {caseworker},

Federal law says my agency pulls my credit report every year from age 14 and helps me fix anything wrong on it. Please send me the most recent report you pulled and the date it was pulled.

If it has not been done this year, please do it now and send me the result.

Thank you,
{name}
{date}`,
      es: `Hola {caseworker}:

La ley federal dice que mi agencia saca mi informe de crédito cada año desde los 14 y me ayuda a corregir cualquier error. Por favor envíame el informe más reciente y la fecha en que lo sacaron.

Si no se ha hecho este año, por favor háganlo ahora y envíenme el resultado.

Gracias,
{name}
{date}`,
    },
    source: { name: "42 U.S.C. 675(5)(I), P.L. 113-183 sec. 106", url: "https://www.govtrack.us/congress/bills/113/hr4980/text" },
  },
  {
    id: "complaint",
    title: { en: "A right is being ignored", es: "Están ignorando un derecho" },
    when: { en: "When you have told your caseworker and nothing changed. The Ombudsperson is free and you do not need anyone's permission.", es: "Cuando ya se lo dijiste a tu trabajador social y nada cambió. La Ombudsperson es gratuita y no necesitas permiso de nadie." },
    to: { en: "Office of the Foster Care Ombudsperson, 1-877-846-1602, fosteryouthhelp.ca.gov", es: "Oficina de la Ombudsperson de Cuidado Adoptivo, 1-877-846-1602, fosteryouthhelp.ca.gov" },
    subject: { en: "Complaint from a youth in care", es: "Queja de un joven en cuidado adoptivo" },
    body: {
      en: `Hello,

I am in foster care in {county} County and I need help with a rights issue.

What happened (with dates): [write it here]

Who I already told: [caseworker / attorney / caregiver, and when]

What I am asking for: [what would fix it]

My name is {name} and my date of birth is {birthdate}. My social worker is {caseworker}. The best way to reach me is [phone or email].

Thank you,
{name}
{date}`,
      es: `Hola:

Estoy en cuidado adoptivo en el condado de {county} y necesito ayuda con un problema de derechos.

Qué pasó (con fechas): [escríbelo aquí]

A quién ya se lo dije: [trabajador social / abogado / cuidador, y cuándo]

Qué pido: [qué lo arreglaría]

Me llamo {name} y mi fecha de nacimiento es {birthdate}. Mi trabajador social es {caseworker}. La mejor forma de contactarme es [teléfono o correo].

Gracias,
{name}
{date}`,
    },
    source: { name: "California Foster Care Ombudsperson", url: "https://fosteryouthhelp.ca.gov/" },
  },
];

export interface Fill { name: string; caseworker: string; county: string; date: string; birthdate: string }

export function fill(template: string, f: Fill, lang = "en"): string {
  const es = lang === "es";
  const v = (s: string, fallback: string) => (s.trim() ? s.trim() : fallback);
  return template
    .replace(/\{name\}/g, v(f.name, es ? "[tu nombre]" : "[your name]"))
    .replace(/\{caseworker\}/g, v(f.caseworker, es ? "[nombre del trabajador social]" : "[caseworker's name]"))
    .replace(/\{county\}/g, v(f.county, es ? "[condado]" : "[county]"))
    .replace(/\{birthdate\}/g, v(f.birthdate, es ? "[tu fecha de nacimiento]" : "[your birthdate]"))
    .replace(/\{date\}/g, f.date);
}
