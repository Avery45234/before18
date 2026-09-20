import type { Text } from "../i18n";
// The exit documents. Federal law says the agency hands these over when you leave
// care at 18+ after 6 months in care. In practice a lot of young people walk out
// without them and spend months trying to get a job or an apartment with nothing
// to show. So: a checklist, where each one comes from, and what it costs to replace.

import { DOC_TR } from "./translations";

export interface ExitDocument {
  id: string;
  name: Text;
  why: Text;
  getIt: Text; // where to get it in California
  replaceCost: Text;
  url: string;
}

export const exitDocuments: ExitDocument[] = [
  {
    id: "birth-certificate",
    name: { en: "Certified birth certificate", es: "Acta de nacimiento certificada" },
    why: { en: "Needed for a state ID, a passport, a Social Security card, and most jobs.", es: "Necesaria para la identificación estatal, el pasaporte, la tarjeta de Seguro Social y la mayoría de los empleos." },
    getIt: { en: "California Department of Public Health, Vital Records, or the county recorder where you were born. Your caseworker can request it for you while you are still in care.", es: "Departamento de Salud Pública de California (Registros Vitales) o el registrador del condado donde naciste. Tu trabajador social puede solicitarla por ti mientras sigas en el sistema." },
    replaceCost: { en: "Fee applies (around $30 in California) and processing can take weeks.", es: "Tiene costo (unos $30 en California) y el trámite puede tardar semanas." },
    url: "https://www.cdph.ca.gov/Programs/CHSI/Pages/Vital-Records.aspx",
  },
  {
    id: "ssn-card",
    name: { en: "Social Security card", es: "Tarjeta de Seguro Social" },
    why: { en: "Needed for every job, financial aid, and benefits.", es: "Necesaria para cualquier empleo, ayuda financiera y beneficios." },
    getIt: { en: "Social Security Administration (ssa.gov). Replacement is free. You need an ID and proof of citizenship or status.", es: "Administración del Seguro Social (ssa.gov). El reemplazo es gratis. Necesitas una identificación y prueba de ciudadanía o estatus." },
    replaceCost: { en: "Free, but you need an ID first - which is why the order matters.", es: "Gratis, pero primero necesitas una identificación; por eso importa el orden." },
    url: "https://www.ssa.gov/number-card",
  },
  {
    id: "state-id",
    name: { en: "California ID or driver's license", es: "Identificación de California o licencia de conducir" },
    why: { en: "Needed to open a bank account, sign a lease, start a job, or board a plane.", es: "Necesaria para abrir una cuenta bancaria, firmar un contrato de renta, empezar un trabajo o abordar un avión." },
    getIt: { en: "DMV. Ask your ILP coordinator - counties often cover the fee for foster youth, and the ILP can help with driver's ed.", es: "DMV. Pregunta a tu coordinador del ILP: los condados suelen cubrir la cuota para jóvenes en cuidado, y el ILP puede ayudar con clases de manejo." },
    replaceCost: { en: "DMV fee applies; ask the ILP about a fee waiver or reimbursement.", es: "El DMV cobra una cuota; pregunta al ILP por una exención o reembolso." },
    url: "https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/",
  },
  {
    id: "health-insurance",
    name: { en: "Health insurance information (Medi-Cal card)", es: "Información de seguro médico (tarjeta de Medi-Cal)" },
    why: { en: "Your Medi-Cal should continue to 26. Have the card and your county case number.", es: "Tu Medi-Cal debe continuar hasta los 26. Ten la tarjeta y tu número de caso del condado." },
    getIt: { en: "Your caseworker, or the county Medi-Cal office. Ask for your BIC (Benefits Identification Card) number.", es: "Tu trabajador social o la oficina de Medi-Cal del condado. Pide tu número BIC (tarjeta de identificación de beneficios)." },
    replaceCost: { en: "Free. Reapply with form MC 250A if it lapsed.", es: "Gratis. Vuelve a solicitarlo con el formulario MC 250A si se venció." },
    url: "https://www.dhcs.ca.gov/services/medi-cal-resources/medi-cal-eligibility-division/frequently-asked-questions-for-the-former-foster-youth-program/",
  },
  {
    id: "medical-records",
    name: { en: "Copy of your medical and immunization records", es: "Copia de tu expediente médico y de vacunas" },
    why: { en: "Colleges, jobs, and new doctors ask. Immunization records are hard to rebuild later.", es: "Universidades, empleos y nuevos médicos los piden. El registro de vacunas es difícil de reconstruir después." },
    getIt: { en: "Ask your caseworker for your Health and Education Passport, and ask your clinic for a copy of your file.", es: "Pide a tu trabajador social tu Pasaporte de Salud y Educación, y a tu clínica una copia de tu expediente." },
    replaceCost: { en: "Usually free from the clinic; slow if you do not know which clinics you went to.", es: "Normalmente gratis en la clínica; lento si no sabes a qué clínicas fuiste." },
    url: "https://www.govtrack.us/congress/bills/113/hr4980/text",
  },
  {
    id: "school-records",
    name: { en: "School transcripts and IEP (if you have one)", es: "Expedientes escolares y el IEP (si tienes uno)" },
    why: { en: "Needed for college, financial aid, and job training programs.", es: "Necesarios para la universidad, ayuda financiera y programas de capacitación." },
    getIt: { en: "Your school's registrar; your district's foster youth liaison can pull them from every school you attended.", es: "La oficina de registros de tu escuela; el enlace de jóvenes en cuidado de tu distrito puede pedirlos a todas las escuelas donde estudiaste." },
    replaceCost: { en: "Usually free; can take weeks per school.", es: "Normalmente gratis; puede tardar semanas por escuela." },
    url: "https://www.cde.ca.gov/ls/pf/fy/",
  },
  {
    id: "court-orders",
    name: { en: "Court documents proving you were in foster care", es: "Documentos de la corte que prueban que estuviste en cuidado adoptivo" },
    why: { en: "Proof of foster care status unlocks Chafee, NextUp, priority registration, and the FAFSA question. A dependency court order or a 'ward of the court' letter works.", es: "La prueba de tu estatus abre la beca Chafee, NextUp, inscripción prioritaria y la pregunta de la FAFSA. Sirve una orden de la corte de dependencia o una carta de 'ward of the court'." },
    getIt: { en: "Your attorney or the juvenile court clerk. Ask for a 'verification of foster care' letter before you leave.", es: "Tu abogado o el secretario de la corte juvenil. Pide una carta de 'verificación de cuidado adoptivo' antes de salir." },
    replaceCost: { en: "Free, but juvenile records are sealed and slow to access later.", es: "Gratis, pero los expedientes juveniles están sellados y tardan en entregarse después." },
    url: "https://www.csac.ca.gov/chafee",
  },
  {
    id: "credit-report",
    name: { en: "Your most recent credit report", es: "Tu informe de crédito más reciente" },
    why: { en: "Landlords check it. Identity theft against foster youth is common and you want to find it before they do.", es: "Los arrendadores lo revisan. El robo de identidad a jóvenes en cuidado es común y conviene detectarlo antes que ellos." },
    getIt: { en: "Your agency must pull it every year from 14. Or get it free at annualcreditreport.com.", es: "Tu agencia debe sacarlo cada año desde los 14. O consíguelo gratis en annualcreditreport.com." },
    replaceCost: { en: "Free.", es: "Gratis." },
    url: "https://www.annualcreditreport.com/",
  },
];

for (const d of exitDocuments) { const tr = DOC_TR[d.id]; if (tr) { Object.assign(d.name, tr.name); Object.assign(d.why, tr.why); } }
