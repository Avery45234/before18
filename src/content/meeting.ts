import { pick, type Text } from "../i18n";
import type { Timeline } from "../engine/timeline";
import type { Lang } from "../model/profile";

// Questions to bring to the transition plan meeting (or any meeting with a
// caseworker). Built from what the person is actually eligible for, so the list is
// theirs, not generic. Written as things a 17-year-old can say out loud.

const Q: Record<string, Text> = {
  "transition-plan": { en: "When is my transition plan meeting? I would like my attorney and one adult I choose to be there.", es: "¿Cuándo es mi reunión del plan de transición? Quiero que estén mi abogado y un adulto que yo elija." },
  efc: { en: "I want to stay in extended foster care after 18. Which of the five conditions will I meet, and when do I sign the Mutual Agreement (SOC 162)?", es: "Quiero quedarme en el cuidado extendido después de los 18. ¿Cuál de las cinco condiciones cumpliré y cuándo firmo el Acuerdo Mutuo (SOC 162)?" },
  "efc-reentry": { en: "If I leave and change my mind, who exactly do I call to re-enter before 21? Write the name and number down for me.", es: "Si me voy y cambio de opinión, ¿a quién exactamente llamo para reingresar antes de los 21? Anótame el nombre y el número." },
  "medi-cal-26": { en: "Is my Medi-Cal set to continue under the Former Foster Youth program until 26? What is my BIC number?", es: "¿Mi Medi-Cal seguirá bajo el programa de ex jóvenes en cuidado hasta los 26? ¿Cuál es mi número BIC?" },
  "exit-documents": { en: "Before I sign anything to leave care, I need my birth certificate, Social Security card, state ID, medical records, and insurance info. Which ones do you have right now?", es: "Antes de firmar mi salida necesito mi acta de nacimiento, tarjeta de Seguro Social, identificación estatal, expediente médico e información de seguro. ¿Cuáles tienes ahora mismo?" },
  "credit-report": { en: "Have you pulled my credit report this year? Can I see it?", es: "¿Ya sacaron mi informe de crédito este año? ¿Puedo verlo?" },
  ilp: { en: "Who is my ILP coordinator, and what can the ILP pay for - a deposit, a laptop, driver's ed, a license?", es: "¿Quién es mi coordinador del ILP y qué puede pagar el ILP: un depósito, una laptop, clases de manejo, la licencia?" },
  "fafsa-independent": { en: "Can someone sit with me to file the FAFSA (or CADAA)? I answer yes to the foster care question and skip the parent section.", es: "¿Alguien puede sentarse conmigo para llenar la FAFSA (o CADAA)? Respondo sí a la pregunta de cuidado adoptivo y omito la sección de padres." },
  "chafee-grant": { en: "Can I get a letter verifying I was in foster care between 16 and 18, for the Chafee Grant and NextUp?", es: "¿Pueden darme una carta que verifique que estuve en cuidado adoptivo entre los 16 y 18, para la beca Chafee y NextUp?" },
  "thp-plus": { en: "Which THP-Plus housing providers serve this county, and is there a waitlist I should get on now?", es: "¿Qué proveedores de vivienda THP-Plus atienden este condado y hay una lista de espera a la que deba anotarme ahora?" },
  "school-of-origin": { en: "If my placement changes, I want to stay at my school. Who is the district's foster youth liaison?", es: "Si cambia mi hogar, quiero quedarme en mi escuela. ¿Quién es el enlace de jóvenes en cuidado del distrito?" },
  calfresh: { en: "Will I qualify for CalFresh after I leave, and does being in extended foster care exempt me from the student rules?", es: "¿Calificaré para CalFresh cuando salga, y estar en cuidado extendido me exime de las reglas de estudiante?" },
};

const ALWAYS: Text[] = [
  { en: "What is the exact date my case is scheduled to close? (It matters that it is on or after my 18th birthday.)", es: "¿Cuál es la fecha exacta en que se cerrará mi caso? (Importa que sea el día de mis 18 o después.)" },
  { en: "Can I have copies of everything I sign today?", es: "¿Puedo tener copias de todo lo que firme hoy?" },
];

export function meetingQuestions(t: Timeline, lang: Lang): { id: string; text: string }[] {
  const out: { id: string; text: string }[] = [];
  for (const it of t.items) {
    if (it.status === "ineligible" || it.status === "closed") continue;
    const q = Q[it.benefit.id];
    if (q) out.push({ id: it.benefit.id, text: pick(q, lang) });
  }
  ALWAYS.forEach((a, i) => out.push({ id: `always-${i}`, text: pick(a, lang) }));
  return out;
}
