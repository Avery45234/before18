import type { Text } from "../i18n";
import type { Profile } from "../model/profile";
import { benefitById } from "../content/benefits";
import { buildTimeline } from "./timeline";

// "What happens if I..." - the part of the app that shows a decision's consequences
// before you make it. Each scenario tweaks the profile the way the decision would,
// rebuilds the timeline with the real rules, and reports exactly what falls off the
// list, with a dollar estimate where one is honest to give.

export interface Loss {
  benefitId: string;
  name: Text;
  estimate?: number; // dollars, rough, explained in `how`
  how: Text;
}

export interface WhatIf {
  id: string;
  title: Text;
  decision: Text; // the thing you would be doing
  losses: Loss[];
  keeps: Text[];
  chain: Text[]; // cause -> effect, in order
  total: number;
  fact: { en: string; es: string; source: string; url: string };
}

const EFC_MONTHLY = 1301; // SILP basic rate, eff. July 1, 2025
const CHAFEE_YEAR = 5000;
const PELL_YEAR = 7395;

export function whatIfScenarios(profile: Profile, today = new Date()): WhatIf[] {
  const base = buildTimeline(profile, today);
  if (!base) return [];
  const out: WhatIf[] = [];

  // ---- 1. leave care at 18 instead of extended foster care
  {
    const efc = benefitById("efc")!;
    const months = 36;
    const total = EFC_MONTHLY * months;
    out.push({
      id: "leave-at-18",
      title: { en: "Leave care on my 18th birthday", es: "Salir del sistema el día que cumplo 18" },
      decision: { en: "Sign out at 18 instead of signing the Mutual Agreement for extended foster care.", es: "Salir a los 18 en vez de firmar el Acuerdo Mutuo para el cuidado extendido." },
      losses: [
        {
          benefitId: "efc",
          name: efc.name,
          estimate: total,
          how: { en: `About $${EFC_MONTHLY.toLocaleString()} a month for up to ${months} months if you lived in a SILP, plus a placement, a caseworker, and ILP support until 21.`, es: `Unos $${EFC_MONTHLY.toLocaleString()} al mes hasta por ${months} meses si vivieras en un SILP, más un hogar, un trabajador social y apoyo del ILP hasta los 21.` },
        },
      ],
      keeps: [
        { en: "Medi-Cal until 26 (you were still in care on your 18th birthday)", es: "Medi-Cal hasta los 26 (seguías en cuidado el día que cumpliste 18)" },
        { en: "The right to re-enter any time before 21", es: "El derecho a volver en cualquier momento antes de los 21" },
        { en: "Chafee, NextUp, FAFSA independence, THP-Plus", es: "Chafee, NextUp, independencia en la FAFSA, THP-Plus" },
      ],
      chain: [
        { en: "You leave at 18 with no placement and no monthly support", es: "Sales a los 18 sin hogar asignado y sin apoyo mensual" },
        { en: "Rent, food, and a phone now come out of a job you may not have yet", es: "Renta, comida y teléfono ahora salen de un trabajo que quizá aún no tienes" },
        { en: "One missed month is how most people end up on a couch, then a shelter", es: "Un mes sin pagar es como la mayoría termina en un sofá, y luego en un albergue" },
      ],
      total,
      fact: { en: "About 20% of foster youth become homeless the day they age out; 40-50% within 18 months.", es: "Cerca del 20% de los jóvenes en cuidado adoptivo quedan sin hogar el día que salen del sistema; del 40 al 50% en 18 meses.", source: "Finally Family Homes / Alternative Family Services", url: "https://finallyfamilyhomes.org/the-problem/" },
    });
  }

  // ---- 2. exit before the 18th birthday (case closes, guardianship, running and not coming back)
  {
    const before = { ...profile, inCareOn18: "no" as const };
    const t = buildTimeline(before, today);
    const lostIds = ["medi-cal-26", "efc", "efc-reentry", "thp-plus", "exit-documents"];
    const losses: Loss[] = [];
    let total = 0;
    for (const id of lostIds) {
      const b = benefitById(id)!;
      const wasOk = base.items.find((i) => i.benefit.id === id)?.status !== "ineligible";
      const nowBlocked = t?.items.find((i) => i.benefit.id === id)?.status === "ineligible";
      if (!wasOk || !nowBlocked) continue;
      let estimate: number | undefined;
      let how = { en: "", es: "" };
      if (id === "efc") { estimate = EFC_MONTHLY * 36; how = { en: "Up to 36 months of placement and about $1,301 a month.", es: "Hasta 36 meses de hogar y unos $1,301 al mes." }; }
      if (id === "medi-cal-26") how = { en: "Eight years of free, full health coverage, no income limit. You would have to qualify some other way.", es: "Ocho años de cobertura médica completa y gratis, sin límite de ingresos. Tendrías que calificar de otra forma." };
      if (id === "thp-plus") how = { en: "Up to 36 months of transitional housing between 18 and 25.", es: "Hasta 36 meses de vivienda de transición entre los 18 y 25." };
      if (id === "efc-reentry") how = { en: "The safety net of coming back before 21 disappears with it.", es: "La red de seguridad de volver antes de los 21 desaparece con esto." };
      if (id === "exit-documents") how = { en: "Nobody is required to hand you your birth certificate, Social Security card, records, or ID.", es: "Nadie está obligado a entregarte tu acta de nacimiento, tarjeta de Seguro Social, expedientes o identificación." };
      total += estimate ?? 0;
      losses.push({ benefitId: id, name: b.name, estimate, how });
    }
    out.push({
      id: "exit-before-18",
      title: { en: "Leave the system before my 18th birthday", es: "Salir del sistema antes de cumplir 18" },
      decision: { en: "Your case closes before your 18th birthday - reunification, guardianship, or you leave and the case is dismissed.", es: "Tu caso se cierra antes de tu cumpleaños 18: reunificación, tutela, o te vas y el caso se cierra." },
      losses,
      keeps: [
        { en: "FAFSA independence and NextUp (you were in care after 13)", es: "Independencia en la FAFSA y NextUp (estuviste en cuidado después de los 13)" },
        { en: "Chafee Grant, if you were in care at some point between 16 and 18", es: "Beca Chafee, si estuviste en cuidado en algún momento entre los 16 y 18" },
      ],
      chain: [
        { en: "Your case closes even one day before you turn 18", es: "Tu caso se cierra aunque sea un día antes de cumplir 18" },
        { en: "You were not 'in care on your 18th birthday', which is the test for Medi-Cal to 26, extended care, and THP-Plus", es: "No estabas 'en cuidado el día de tus 18', que es la prueba para Medi-Cal hasta los 26, cuidado extendido y THP-Plus" },
        { en: "Guardianship or going home can be the right call. Make it knowing the date matters.", es: "La tutela o volver a casa puede ser la decisión correcta. Tómala sabiendo que la fecha importa." },
      ],
      total,
      fact: { en: "Medi-Cal for former foster youth requires being in care on your 18th birthday. There is no income test and you can self-attest.", es: "El Medi-Cal para ex jóvenes en cuidado requiere haber estado en cuidado el día de tus 18. No hay prueba de ingresos y puedes declararlo tú mismo.", source: "California DHCS, Former Foster Youth Program FAQ", url: "https://www.dhcs.ca.gov/services/medi-cal-resources/medi-cal-eligibility-division/frequently-asked-questions-for-the-former-foster-youth-program/" },
    });
  }

  // ---- 3. skip the FAFSA / CADAA
  {
    const total = PELL_YEAR * 4 + CHAFEE_YEAR * 4;
    out.push({
      id: "skip-fafsa",
      title: { en: "Skip the FAFSA (or CADAA)", es: "No llenar la FAFSA (o CADAA)" },
      decision: { en: "Not filing the financial aid form because it looks hard or you think you will not qualify.", es: "No presentar la solicitud de ayuda financiera porque parece difícil o crees que no calificarás." },
      losses: [
        { benefitId: "fafsa-independent", name: benefitById("fafsa-independent")!.name, estimate: PELL_YEAR * 4, how: { en: `As an independent student you usually get the maximum Pell Grant, up to $${PELL_YEAR.toLocaleString()} a year, about four years of it.`, es: `Como estudiante independiente normalmente recibes la Beca Pell máxima, hasta $${PELL_YEAR.toLocaleString()} al año, unos cuatro años.` } },
        { benefitId: "chafee-grant", name: benefitById("chafee-grant")!.name, estimate: CHAFEE_YEAR * 4, how: { en: "The Chafee Grant requires a FAFSA or CADAA on file. No form, no $5,000.", es: "La beca Chafee requiere una FAFSA o CADAA presentada. Sin formulario, no hay $5,000." } },
        { benefitId: "nextup", name: benefitById("nextup")!.name, how: { en: "NextUp financial help also runs through your aid file.", es: "La ayuda financiera de NextUp también depende de tu expediente de ayuda." } },
      ],
      keeps: [{ en: "Priority registration and NextUp counseling (you can still join)", es: "Inscripción prioritaria y consejería de NextUp (aún puedes unirte)" }],
      chain: [
        { en: "No FAFSA means no Pell, no Cal Grant, no Chafee", es: "Sin FAFSA no hay Pell, ni Cal Grant, ni Chafee" },
        { en: "Tuition and books come out of your own pocket or loans", es: "Colegiatura y libros salen de tu bolsillo o de préstamos" },
        { en: "Most former foster youth who leave college leave for money reasons, not grades", es: "La mayoría de los ex jóvenes en cuidado que dejan la universidad lo hacen por dinero, no por calificaciones" },
      ],
      total,
      fact: { en: "Only 3-4% of former foster youth earn a four-year degree; money is the most common reason they stop.", es: "Solo del 3 al 4% de los ex jóvenes en cuidado adoptivo obtienen un título universitario de cuatro años; el dinero es la razón más común para abandonar.", source: "Nicole Childers, TODAY (citing national estimates)", url: "https://www.today.com/parents/essay/foster-care-aging-out-homelessness-rcna53014" },
    });
  }

  // ---- 4. leave without documents
  {
    out.push({
      id: "leave-without-docs",
      title: { en: "Leave without my documents", es: "Salir sin mis documentos" },
      decision: { en: "Signing your exit paperwork before you are holding your birth certificate, Social Security card, ID, and records.", es: "Firmar tu salida antes de tener en la mano tu acta de nacimiento, tarjeta de Seguro Social, identificación y expedientes." },
      losses: [
        { benefitId: "exit-documents", name: benefitById("exit-documents")!.name, how: { en: "Weeks to months of delay on every job, lease, bank account, and financial aid form, plus fees to replace what the agency should have handed you.", es: "Semanas o meses de retraso en cada empleo, contrato de renta, cuenta bancaria y solicitud de ayuda, más cuotas para reemplazar lo que la agencia debió entregarte." } },
      ],
      keeps: [{ en: "The legal right to those documents does not expire - but getting them later is on you", es: "El derecho legal a esos documentos no expira, pero conseguirlos después queda en tus manos" }],
      chain: [
        { en: "No ID means no bank account, no lease, and no way to replace your Social Security card", es: "Sin identificación no hay cuenta bancaria, ni contrato de renta, ni forma de reemplazar tu tarjeta de Seguro Social" },
        { en: "No birth certificate means no ID. It is a loop, and it starts with the birth certificate", es: "Sin acta de nacimiento no hay identificación. Es un círculo, y empieza con el acta" },
        { en: "Every week you cannot start a job is a week of rent you do not have", es: "Cada semana que no puedes empezar a trabajar es una semana de renta que no tienes" },
      ],
      total: 0,
      fact: { en: "Federal law requires the agency to hand you these documents when you leave care at 18 or older after 6 months in care.", es: "La ley federal obliga a la agencia a entregarte estos documentos cuando sales del sistema a los 18 o más, tras 6 meses en cuidado.", source: "P.L. 113-183 §113", url: "https://www.govtrack.us/congress/bills/113/hr4980/text" },
    });
  }

  return out;
}
