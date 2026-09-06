import type { Text } from "../i18n";

// "A year in their shoes." Seven months of Jordan's life, from 17 and a half to
// almost 19. Every choice maps to a real rule in benefits.ts and the numbers come
// from the same sources. The choices are written so that each one is something a
// real person would do; the point is not to trick the player but to make the
// rules feel like what they are - the difference between a place to live and a
// couch - inside a life that has other things going on in it.

export interface Flags {
  meeting: boolean; // the transition plan meeting happened
  stayedTo18: boolean; // the case was still open on the 18th birthday
  efc: boolean; // signed the Mutual Agreement for extended foster care
  efcKept: boolean; // still meeting one of the five conditions
  fafsa: boolean; // filed as an independent student
  docs: boolean; // documents in hand
  strain: number; // 0..2, how many relationships took a hit (narrative only)
  cash: number; // rough dollars in the bank (narrative only)
}

export const startFlags: Flags = { meeting: false, stayedTo18: true, efc: false, efcKept: true, fafsa: false, docs: false, strain: 0, cash: 340 };

export interface Rule {
  text: Text;
  source: string;
  url: string;
}

export interface Choice {
  id: string;
  label: Text;
  result: Text; // what happens right after you choose
  effects: Partial<Flags>;
  rule?: Rule;
  tone: "good" | "mixed" | "bad";
}

export interface Scene {
  id: string;
  age: Text; // "17 years, 6 months"
  month: Text; // "October"
  title: Text;
  text: (f: Flags) => Text;
  choices: (f: Flags) => Choice[];
}

const T = (en: string, es: string): Text => ({ en, es });

export const scenes: Scene[] = [
  // ------------------------------------------------------------ 1
  {
    id: "report-card",
    age: T("17 years, 6 months", "17 años, 6 meses"),
    month: T("October", "Octubre"),
    title: T("Report card night", "La noche de las calificaciones"),
    text: () =>
      T(
        "You are Jordan. Denise’s kitchen, 9:40 p.m., a B in chem on the counter that nobody has looked at because Denise works nights and you got home from the smoothie place at nine. Three placements since you were twelve. Your brother Eli is in a different one across town; you see him every other Sunday. You want to be an EMT, which is a real thing you looked up: a one-semester program at the community college, $1,600, and they want an ID, a Social Security card, and your shot records. Your phone buzzes. Ms. Okafor, your caseworker, who you like and who has forty other kids: “Hi Jordan! Need to update your TILP by Friday. Anything new? Everything ok?”",
        "Eres Jordan. La cocina de Denise, 9:40 p.m., una B en química sobre la barra que nadie ha visto porque Denise trabaja de noche y tú llegaste del local de licuados a las nueve. Tres hogares desde los doce. Tu hermano Eli está en otro, al otro lado de la ciudad; lo ves un domingo sí y otro no. Quieres ser paramédico, que es algo real que investigaste: un programa de un semestre en el colegio comunitario, $1,600, y piden identificación, tarjeta de Seguro Social y tu cartilla de vacunas. Vibra tu teléfono. La Sra. Okafor, tu trabajadora social, que te cae bien y que tiene otros cuarenta chicos: “¡Hola Jordan! Necesito actualizar tu TILP para el viernes. ¿Algo nuevo? ¿Todo bien?”",
      ),
    choices: () => [
      {
        id: "fine",
        label: T("“All good! B in chem lol. Working a lot.” Send. You are tired and she is busy.", "“¡Todo bien! B en química jaja. Trabajando mucho.” Enviar. Estás cansado y ella ocupada."),
        result: T("She hearts it. The TILP gets updated with “doing well, employed.” Nobody schedules anything, because nothing seemed to need scheduling. Your 18th birthday is in six months and no one has said the words “transition plan” out loud.", "Ella pone un corazón. El TILP se actualiza con “va bien, tiene empleo”. Nadie programa nada, porque nada parecía necesitarlo. Cumples 18 en seis meses y nadie ha dicho en voz alta “plan de transición”."),
        effects: { meeting: false },
        tone: "mixed",
      },
      {
        id: "ask",
        label: T("“Actually - what happens when I turn 18? Like, exactly?”", "“En realidad, ¿qué pasa cuando cumpla 18? O sea, exactamente.”"),
        result: T("Three dots for a long time. Then: “Good question. Let’s do your transition planning meeting - I should have flagged it. Can you do the 14th at 4? Bring anyone you want.” At the meeting you find out nobody ever requested your birth certificate and your Social Security card is “probably in the file from the second placement.” There is time to fix both, because you asked.", "Tres puntos durante mucho tiempo. Luego: “Buena pregunta. Hagamos tu reunión del plan de transición; debí señalarla antes. ¿Puedes el 14 a las 4? Trae a quien quieras.” En la reunión descubres que nadie solicitó nunca tu acta de nacimiento y que tu tarjeta de Seguro Social “probablemente está en el expediente del segundo hogar”. Hay tiempo para arreglar ambas, porque preguntaste."),
        effects: { meeting: true },
        rule: { text: T("In the 90 days before you turn 18, your agency must hold a transition planning meeting: housing, health coverage, school, work, a mentor, documents.", "En los 90 días antes de cumplir 18, tu agencia debe realizar una reunión de planificación de transición: vivienda, seguro médico, escuela, trabajo, un mentor, documentos."), source: "42 U.S.C. §675(5)(H)", url: "https://www.congress.gov/crs-product/RL34499" },
        tone: "good",
      },
      {
        id: "denise",
        label: T("Ask Denise in the morning instead. She has done this before; she’ll know.", "Mejor pregúntale a Denise en la mañana. Ella ya ha pasado por esto; sabrá."),
        result: T("Denise, half asleep with coffee: “Baby, we’ll figure it out. You’re not going anywhere.” She means it. She also does not know the difference between extended foster care and a group home, and she is not the one who has to file anything. You text Ms. Okafor “all good.” The meeting does not get scheduled.", "Denise, medio dormida con su café: “Mi niño, lo resolveremos. No te vas a ningún lado.” Lo dice en serio. Tampoco sabe la diferencia entre el cuidado extendido y un hogar grupal, y no es ella quien tiene que presentar nada. Le escribes a la Sra. Okafor “todo bien”. La reunión no se programa."),
        effects: { meeting: false },
        tone: "mixed",
      },
    ],
  },

  // ------------------------------------------------------------ 2
  {
    id: "rochelle",
    age: T("17 years, 9 months", "17 años, 9 meses"),
    month: T("January", "Enero"),
    title: T("Aunt Rochelle’s spare room", "El cuarto libre de la tía Rochelle"),
    text: (f) =>
      T(
        `Your aunt Rochelle calls on a Tuesday. Her roommate moved out; she has a room; she wants you in it, and she wants to be your legal guardian so it is real and not a visit. She loves you and she is the only adult who has said that to you this year. ${f.meeting ? "You remember Ms. Okafor at the meeting drawing a circle around your birthday on her notepad and saying “this date matters.” " : ""}Ms. Okafor says the court can hear the guardianship on February 12 - or the next open date, March 3. Your birthday is February 20. Rochelle would like you moved in before her February rent is due. “Why would we wait?” she says, and she is not being unkind.`,
        `Tu tía Rochelle llama un martes. Su compañera de cuarto se fue; tiene un cuarto; te quiere ahí, y quiere ser tu tutora legal para que sea real y no una visita. Te quiere y es la única adulta que te lo ha dicho este año. ${f.meeting ? "Recuerdas a la Sra. Okafor en la reunión, dibujando un círculo alrededor de tu cumpleaños en su libreta y diciendo “esta fecha importa”. " : ""}La Sra. Okafor dice que la corte puede ver la tutela el 12 de febrero, o en la siguiente fecha disponible, el 3 de marzo. Tu cumpleaños es el 20 de febrero. A Rochelle le gustaría que te mudaras antes de que venza su renta de febrero. “¿Por qué esperaríamos?”, dice, y no lo dice con mala intención.`,
      ),
    choices: () => [
      {
        id: "feb12",
        label: T("Take the February 12 date. She is family and she is asking now.", "Acepta la fecha del 12 de febrero. Es familia y lo está pidiendo ahora."),
        result: T("The order is signed February 12. You move in on the 14th with two bags and the B in chem. It is a good room. Eight days later you turn 18 at Rochelle’s kitchen table, and on paper you were not in foster care that day - which is the test for Medi-Cal until 26, extended foster care, and THP-Plus housing. Nobody mentions it, because nobody in the room knows.", "La orden se firma el 12 de febrero. Te mudas el 14 con dos bolsas y la B en química. Es un buen cuarto. Ocho días después cumples 18 en la mesa de Rochelle, y en papel no estabas en cuidado adoptivo ese día, que es la prueba para Medi-Cal hasta los 26, el cuidado extendido y la vivienda THP-Plus. Nadie lo menciona, porque nadie en el cuarto lo sabe."),
        effects: { stayedTo18: false, efc: false },
        rule: { text: T("Medi-Cal to 26, extended foster care, and THP-Plus all require being in care on your 18th birthday. Guardianship can be the right call; the date on the order decides what you keep.", "Medi-Cal hasta los 26, el cuidado extendido y THP-Plus requieren estar en cuidado el día de tus 18. La tutela puede ser la decisión correcta; la fecha de la orden decide lo que conservas."), source: "California DHCS, Former Foster Youth FAQ; CDSS AB 12", url: "https://www.dhcs.ca.gov/services/medi-cal-resources/medi-cal-eligibility-division/frequently-asked-questions-for-the-former-foster-youth-program/" },
        tone: "bad",
      },
      {
        id: "mar3",
        label: T("Ask for March 3 and move in anyway. Tell Rochelle it is a paperwork thing.", "Pide el 3 de marzo y múdate de todos modos. Dile a Rochelle que es cosa de papeleo."),
        result: T("Rochelle is hurt for about a day (“a paperwork thing?”) and then she is over it. You move in on the 14th; the county calls it a “trial visit,” which is a real thing. The order is signed March 3. You were still in care on your birthday. You will not understand for months how much that sentence was worth.", "Rochelle se siente herida como un día (“¿cosa de papeleo?”) y luego lo supera. Te mudas el 14; el condado lo llama “visita de prueba”, que existe de verdad. La orden se firma el 3 de marzo. Seguías en cuidado el día de tu cumpleaños. Tardarás meses en entender cuánto valía esa frase."),
        effects: { stayedTo18: true, strain: 1 },
        rule: { text: T("Being in care on the 18th birthday is the hinge. A court date three weeks later keeps Medi-Cal to 26, extended foster care, and THP-Plus on the table.", "Estar en cuidado el día de los 18 es la bisagra. Una fecha de corte tres semanas después mantiene Medi-Cal hasta los 26, el cuidado extendido y THP-Plus sobre la mesa."), source: "CDSS - Extended Foster Care (AB 12)", url: "https://www.cdss.ca.gov/inforesources/foster-care/extended-foster-care-ab-12" },
        tone: "good",
      },
      {
        id: "stay",
        label: T("Say no to guardianship. Stay with Denise, keep things how they are.", "Di que no a la tutela. Quédate con Denise, deja las cosas como están."),
        result: T("Rochelle takes it badly. “You’d rather be in the system than with me?” It is not what you meant. You stay at Denise’s; you were in care on your birthday; and the spare room goes to a cousin. Some doors close for reasons that have nothing to do with rules.", "Rochelle se lo toma mal. “¿Prefieres estar en el sistema que conmigo?” No es lo que querías decir. Te quedas con Denise; estabas en cuidado el día de tu cumpleaños; y el cuarto se lo dan a un primo. Algunas puertas se cierran por razones que no tienen nada que ver con las reglas."),
        effects: { stayedTo18: true, strain: 2 },
        tone: "mixed",
      },
    ],
  },

  // ------------------------------------------------------------ 3
  {
    id: "eighteen",
    age: T("18 years, 0 months", "18 años, 0 meses"),
    month: T("February", "Febrero"),
    title: T("A form on a Friday", "Un formulario en viernes"),
    text: (f) =>
      f.stayedTo18
        ? T(
            "Happy birthday. Ms. Okafor meets you at a Starbucks because the office is being painted. She has a form: a Mutual Agreement, SOC 162. Sign it and you are a “non-minor dependent” until 21 - a placement or your own room in a shared apartment, about $1,301 a month paid to you, a caseworker who checks in monthly, as long as you are in school, working 80 hours a month, or in a job program. Or you sign the other form, and you are nobody’s case. Marcus’s mom already said the couch is yours. “No pressure,” Ms. Okafor says, which is what people say when there is.",
            "Feliz cumpleaños. La Sra. Okafor te ve en un Starbucks porque están pintando la oficina. Tiene un formulario: un Acuerdo Mutuo, SOC 162. Fírmalo y eres “dependiente no menor” hasta los 21: un hogar o tu propio cuarto en un departamento compartido, unos $1,301 al mes pagados a ti, un trabajador social que te contacta cada mes, siempre que estudies, trabajes 80 horas al mes o estés en un programa de empleo. O firmas el otro formulario, y ya no eres el caso de nadie. La mamá de Marcus ya dijo que el sofá es tuyo. “Sin presión”, dice la Sra. Okafor, que es lo que dice la gente cuando la hay.",
          )
        : T(
            "Happy birthday. Rochelle makes pancakes. There is no form, because your case closed eight days ago; extended foster care was never on the table and neither was the monthly payment. Ms. Okafor sends a text with a cake emoji and “proud of you.” You have $340 and a shift at noon.",
            "Feliz cumpleaños. Rochelle hace panqueques. No hay formulario, porque tu caso se cerró hace ocho días; el cuidado extendido nunca fue opción, ni el pago mensual. La Sra. Okafor manda un texto con un emoji de pastel y “orgullosa de ti”. Tienes $340 y un turno al mediodía.",
          ),
    choices: (f) =>
      f.stayedTo18
        ? [
            {
              id: "sign",
              label: T("Sign the Mutual Agreement. You can always leave; you cannot always come back.", "Firma el Acuerdo Mutuo. Siempre puedes irte; no siempre puedes volver."),
              result: T("It is a terrible name for a good thing. Within a month the county approves a SILP: a room in a three-bedroom with two other former foster youth, $1,301 to your account on the first. Ms. Okafor still texts. It does feel like being a case sometimes. It also feels like rent.", "Es un nombre terrible para algo bueno. En un mes el condado aprueba un SILP: un cuarto en un departamento de tres recámaras con otros dos ex jóvenes en cuidado, $1,301 a tu cuenta el día primero. La Sra. Okafor sigue escribiendo. A veces sí se siente como ser un caso. También se siente como renta."),
              effects: { efc: true },
              rule: { text: T("Extended foster care: a placement and monthly support to 21. SILP basic rate $1,301 (July 2025).", "Cuidado extendido: un hogar y apoyo mensual hasta los 21. Tarifa básica SILP $1,301 (julio 2025)."), source: "CDSS - AB 12; SILP rate", url: "https://www.cdss.ca.gov/inforesources/foster-care/extended-foster-care-ab-12" },
              tone: "good",
            },
            {
              id: "later",
              label: T("Ask if you can sign later. You want a month of nobody checking on you first.", "Pregunta si puedes firmar después. Quieres un mes sin que nadie te vigile."),
              result: T("You can. Re-entry is a legal right any time before 21. The month becomes four, because Marcus’s couch is fine and calling the county back is a whole thing. Four months with no payment is about $5,200 you did not get, and when you do re-enter, the SILP takes six weeks to set up. Nothing was lost forever. Something was lost.", "Puedes. El reingreso es un derecho legal en cualquier momento antes de los 21. El mes se vuelven cuatro, porque el sofá de Marcus está bien y volver a llamar al condado es todo un asunto. Cuatro meses sin pago son unos $5,200 que no recibiste, y cuando reingresas, el SILP tarda seis semanas en arreglarse. Nada se perdió para siempre. Algo se perdió."),
              effects: { efc: true, cash: 340 - 800 },
              rule: { text: T("You can re-enter extended foster care any time before 21 with a Voluntary Re-entry Agreement (SOC 163). The months in between are not paid back.", "Puedes reingresar al cuidado extendido en cualquier momento antes de los 21 con un Acuerdo de Reingreso Voluntario (SOC 163). Los meses de en medio no se pagan después."), source: "CDSS - Extended Foster Care (AB 12)", url: "https://www.cdss.ca.gov/inforesources/foster-care/extended-foster-care-ab-12" },
              tone: "mixed",
            },
            {
              id: "leave",
              label: T("Sign out. You are eighteen. You have a couch, a job, and a plan.", "Sal del sistema. Tienes dieciocho. Tienes un sofá, un trabajo y un plan."),
              result: T("It feels great. For about five weeks it is great. Then Marcus’s mom’s landlord counts heads, and “the couch is yours” becomes “just for a little while.” You can re-enter before 21 if you know that, and if you can get Ms. Okafor on the phone. You do not call. It feels like admitting something.", "Se siente genial. Como cinco semanas es genial. Luego el arrendador de la mamá de Marcus cuenta cabezas, y “el sofá es tuyo” se vuelve “solo por un tiempito”. Puedes reingresar antes de los 21 si lo sabes, y si logras que la Sra. Okafor conteste el teléfono. No llamas. Se siente como admitir algo."),
              effects: { efc: false },
              rule: { text: T("About 20% of youth are homeless the day they age out; 40-50% within 18 months. Re-entry before 21 is a legal right, and most young people do not use it.", "Cerca del 20% de los jóvenes quedan sin hogar el día que salen; del 40 al 50% en 18 meses. El reingreso antes de los 21 es un derecho legal, y la mayoría no lo usa."), source: "Finally Family Homes; CDSS", url: "https://finallyfamilyhomes.org/the-problem/" },
              tone: "bad",
            },
          ]
        : [
            {
              id: "warehouse",
              label: T("Take the warehouse job Rochelle’s neighbor mentioned. Full time, $19 an hour, starts Monday.", "Acepta el trabajo del almacén que mencionó el vecino de Rochelle. Tiempo completo, $19 la hora, empieza el lunes."),
              result: T("They need a photo ID and your Social Security card by Friday to run payroll. You start looking for the folder.", "Necesitan identificación con foto y tu tarjeta de Seguro Social para el viernes para la nómina. Empiezas a buscar la carpeta."),
              effects: {},
              tone: "mixed",
            },
            {
              id: "thp",
              label: T("Ask Ms. Okafor about THP-Plus, the housing program she mentioned once.", "Pregúntale a la Sra. Okafor por THP-Plus, el programa de vivienda que mencionó una vez."),
              result: T("She checks. THP-Plus is for youth who aged out of care at 18 or older. Your case closed at 17 years and 357 days. “I’m so sorry, Jordan. I should have said something about the date.” You take the warehouse job.", "Ella revisa. THP-Plus es para jóvenes que salieron del sistema a los 18 o más. Tu caso se cerró a los 17 años y 357 días. “Lo siento mucho, Jordan. Debí decir algo sobre la fecha.” Aceptas el trabajo del almacén."),
              effects: {},
              rule: { text: T("THP-Plus serves former foster youth 18 to 25 who aged out of care. A case closed before 18 does not qualify.", "THP-Plus atiende a ex jóvenes en cuidado de 18 a 25 que salieron del sistema al cumplir la edad. Un caso cerrado antes de los 18 no califica."), source: "Youth Law Center - THP-Plus", url: "https://www.ylc.org/resource/policy-alert-thp-plus-program-expansion-a-resource-for-current-and-former-foster-youth-in-california/" },
              tone: "bad",
            },
          ],
  },

  // ------------------------------------------------------------ 4
  {
    id: "hours",
    age: T("18 years, 2 months", "18 años, 2 meses"),
    month: T("April", "Abril"),
    title: T("Sixty-one hours", "Sesenta y una horas"),
    text: (f) =>
      f.stayedTo18 && f.efc
        ? T(
            "The smoothie place cuts everyone to part time. Your April schedule adds up to 61 hours. The Mutual Agreement said one of five things: high school, college, 80 hours of work a month, a job program, or a medical reason. You graduated in June; the EMT program does not start until August. Ms. Okafor’s monthly check-in is on the 28th. She will ask how work is going.",
            "El local de licuados recorta a todos a medio tiempo. Tu horario de abril suma 61 horas. El Acuerdo Mutuo decía una de cinco cosas: preparatoria, universidad, 80 horas de trabajo al mes, un programa de empleo, o razón médica. Te graduaste en junio; el programa de paramédico no empieza hasta agosto. El contacto mensual de la Sra. Okafor es el 28. Te preguntará cómo va el trabajo.",
          )
        : T(
            "The smoothie place cuts everyone to part time. Your April schedule adds up to 61 hours, which at $16.50 is not rent anywhere in the county. You pick up Saturdays at the warehouse. It is fine. You are tired in a way that has a shape.",
            "El local de licuados recorta a todos a medio tiempo. Tu horario de abril suma 61 horas, que a $16.50 no alcanza para la renta en ningún lugar del condado. Tomas sábados en el almacén. Está bien. Estás cansado de una forma que tiene forma.",
          ),
    choices: (f) =>
      f.stayedTo18 && f.efc
        ? [
            {
              id: "quiet",
              label: T("Say work is fine. It is basically fine. It will be 80 again in May.", "Di que el trabajo va bien. Básicamente va bien. En mayo volverán a ser 80."),
              result: T("It is 58 in May. In June the county sends a notice: not meeting participation conditions; the case may be closed. It gets sorted, but you spend three weeks not knowing whether the July payment is coming, and it is the first time the SILP feels like something that can be taken away.", "En mayo son 58. En junio el condado manda un aviso: no cumple las condiciones de participación; el caso podría cerrarse. Se resuelve, pero pasas tres semanas sin saber si llegará el pago de julio, y es la primera vez que el SILP se siente como algo que te pueden quitar."),
              effects: { efcKept: false },
              tone: "bad",
            },
            {
              id: "class",
              label: T("Enroll in one summer class at the community college. Anything. Intro to something.", "Inscríbete en una clase de verano en el colegio comunitario. Lo que sea. Introducción a algo."),
              result: T("“Enrolled in college” is one of the five. The class is Intro to Public Health, it is online, and it turns out to count toward the EMT program. Ms. Okafor writes it down and says “smart.” You did not feel smart. You felt like someone reading the rules.", "“Inscrito en la universidad” es una de las cinco. La clase es Introducción a la Salud Pública, es en línea, y resulta que cuenta para el programa de paramédico. La Sra. Okafor lo anota y dice “inteligente”. No te sentiste inteligente. Te sentiste como alguien leyendo las reglas."),
              effects: { efcKept: true, fafsa: f.fafsa },
              rule: { text: T("The five extended-care conditions: finishing high school or equivalent, enrolled in college or vocational school, working 80+ hours a month, in a program that removes barriers to work, or unable to because of a medical condition.", "Las cinco condiciones del cuidado extendido: terminar la preparatoria o equivalente, estar inscrito en universidad o escuela vocacional, trabajar 80+ horas al mes, estar en un programa que elimine barreras al empleo, o no poder por una condición médica."), source: "CDSS - Extended Foster Care (AB 12)", url: "https://www.cdss.ca.gov/inforesources/foster-care/extended-foster-care-ab-12" },
              tone: "good",
            },
            {
              id: "second-job",
              label: T("Pick up Saturdays at the warehouse. Get the hours to 80 the hard way.", "Toma sábados en el almacén. Llega a las 80 horas a la mala."),
              result: T("You hit 84. It counts. You are working six days a week to keep a payment that exists so you do not have to work six days a week, which you notice, and which is still better than the alternative. Ms. Okafor says “that’s a lot.” It is.", "Llegas a 84. Cuenta. Trabajas seis días a la semana para conservar un pago que existe para que no tengas que trabajar seis días a la semana, cosa que notas, y que sigue siendo mejor que la alternativa. La Sra. Okafor dice “es mucho”. Lo es."),
              effects: { efcKept: true, cash: f.cash + 400 },
              tone: "mixed",
            },
          ]
        : [
            {
              id: "ok",
              label: T("Keep going.", "Sigue adelante."),
              result: T("You keep going.", "Sigues adelante."),
              effects: { cash: f.cash + 150 },
              tone: "mixed",
            },
          ],
  },

  // ------------------------------------------------------------ 5
  {
    id: "fafsa",
    age: T("18 years, 3 months", "18 años, 3 meses"),
    month: T("May", "Mayo"),
    title: T("Parent information", "Información de los padres"),
    text: () =>
      T(
        "The EMT program is $1,600 plus books plus a uniform. The financial aid office says to file the FAFSA. Page four asks for your parents’ tax information. You have a mother in Bakersfield you have not spoken to in two years and a father on a birth certificate. A woman named Ms. Pham at the counter is waiting. Denise offered her tax return once, “if that helps.”",
        "El programa de paramédico cuesta $1,600 más libros más uniforme. La oficina de ayuda financiera dice que llenes la FAFSA. La página cuatro pide la información fiscal de tus padres. Tienes una madre en Bakersfield con la que no hablas desde hace dos años y un padre en un acta de nacimiento. Una mujer llamada Sra. Pham en el mostrador está esperando. Denise ofreció una vez su declaración de impuestos, “si sirve de algo”.",
      ),
    choices: () => [
      {
        id: "denise-taxes",
        label: T("Use Denise’s tax return. She is the closest thing to a parent you have, and she offered.", "Usa la declaración de Denise. Es lo más cercano a una madre que tienes, y ella lo ofreció."),
        result: T("Denise is not your parent on any form, and her income makes you look like a kid from a two-income house. The aid letter comes back: a small loan, no grant. Ms. Pham says “that doesn’t look right” and you find out three weeks later, from a flyer, what you should have said.", "Denise no es tu madre en ningún formulario, y su ingreso te hace ver como un chico de una casa con dos ingresos. La carta de ayuda llega: un préstamo pequeño, sin beca. La Sra. Pham dice “eso no se ve bien” y tres semanas después, por un volante, te enteras de lo que debiste decir."),
        effects: { fafsa: false },
        rule: { text: T("Foster parents’ income does not belong on the FAFSA. If you were in foster care at any time since 13, you are independent: no parent information at all.", "El ingreso de los padres de crianza no va en la FAFSA. Si estuviste en cuidado adoptivo en cualquier momento desde los 13, eres independiente: sin información de padres."), source: "Federal Student Aid - Dependency status", url: "https://studentaid.gov/apply-for-aid/fafsa/filling-out/dependency" },
        tone: "bad",
      },
      {
        id: "say-it",
        label: T("Tell Ms. Pham you have been in foster care since you were twelve and ask what that changes.", "Dile a la Sra. Pham que estás en cuidado adoptivo desde los doce y pregunta qué cambia eso."),
        result: T("Everything, it turns out. One checkbox and the parent section disappears. Independent student: maximum Pell Grant, up to $7,395. Then Ms. Pham slides a second form across: the Chafee Grant, up to $5,000 more, and a program called NextUp with a counselor who has heard of a TILP. The EMT program is now free with money left over. Forty minutes.", "Todo, resulta. Una casilla y desaparece la sección de padres. Estudiante independiente: Beca Pell máxima, hasta $7,395. Luego la Sra. Pham te pasa un segundo formulario: la beca Chafee, hasta $5,000 más, y un programa llamado NextUp con un consejero que sí sabe qué es un TILP. El programa de paramédico ahora es gratis y sobra dinero. Cuarenta minutos."),
        effects: { fafsa: true },
        rule: { text: T("In care at any time since 13 = independent on the FAFSA. Chafee Grant up to $5,000 a year until 26; NextUp at every California community college.", "En cuidado en cualquier momento desde los 13 = independiente en la FAFSA. Beca Chafee hasta $5,000 al año hasta los 26; NextUp en todos los colegios comunitarios de California."), source: "studentaid.gov; CSAC; California Community Colleges", url: "https://www.csac.ca.gov/chafee" },
        tone: "good",
      },
      {
        id: "cash",
        label: T("Skip the form. $1,600 is four months of saving; you would rather owe nobody.", "Sáltate el formulario. $1,600 son cuatro meses de ahorro; prefieres no deberle a nadie."),
        result: T("You save it. It takes until October, which means you miss the August cohort and start in January. Nobody told you that the form would have been a grant, not a loan, and that “owing nobody” was already on offer.", "Lo ahorras. Te toma hasta octubre, lo que significa que pierdes el grupo de agosto y empiezas en enero. Nadie te dijo que el formulario habría sido una beca, no un préstamo, y que “no deberle a nadie” ya estaba disponible."),
        effects: { fafsa: false },
        tone: "mixed",
      },
    ],
  },

  // ------------------------------------------------------------ 6
  {
    id: "saturday",
    age: T("18 years, 4 months", "18 años, 4 meses"),
    month: T("June", "Junio"),
    title: T("Saturday", "Sábado"),
    text: (f) =>
      T(
        `The EMT program wants a photo ID, your Social Security card, and your immunization records by August 1. ${f.meeting ? "Ms. Okafor’s folder from the transition meeting has your birth certificate and a printout of your Medi-Cal number, and a sticky note: “SS card - requested 3/2.” " : "You have a school ID that expired in June and a photo of a photo of your birth certificate on Denise’s phone. "}Saturday you could: go to the DMV (three hours, and you need the birth certificate for the ID and the ID for the Social Security card); work a double at the warehouse ($180); or take the bus to see Eli, whose visit got moved to Saturday because his foster mom has church Sunday.`,
        `El programa de paramédico pide identificación con foto, tu tarjeta de Seguro Social y tu cartilla de vacunas para el 1 de agosto. ${f.meeting ? "La carpeta de la Sra. Okafor de la reunión de transición tiene tu acta de nacimiento y una impresión de tu número de Medi-Cal, y una nota: “Tarjeta SS: solicitada 3/2”. " : "Tienes una credencial escolar que venció en junio y una foto de una foto de tu acta de nacimiento en el teléfono de Denise. "}El sábado podrías: ir al DMV (tres horas, y necesitas el acta para la identificación y la identificación para la tarjeta de Seguro Social); trabajar doble turno en el almacén ($180); o tomar el autobús para ver a Eli, cuya visita se movió al sábado porque su madre de crianza va a la iglesia el domingo.`,
      ),
    choices: (f) => [
      {
        id: "dmv",
        label: T("DMV. Bring whatever you have and see how far you get.", "DMV. Lleva lo que tengas y ve hasta dónde llegas."),
        result: f.meeting
          ? T("With the certified birth certificate from the folder, the ID takes ninety minutes. The Social Security card that Ms. Okafor requested in March is in your file. By July you have all three. Eli is disappointed. You promise two Sundays in a row and you keep it.", "Con el acta certificada de la carpeta, la identificación toma noventa minutos. La tarjeta de Seguro Social que la Sra. Okafor solicitó en marzo está en tu expediente. Para julio tienes las tres. Eli se decepciona. Prometes dos domingos seguidos y cumples.")
          : T("A photo of a photo is not a certified copy. The DMV cannot issue an ID. You order a birth certificate from the state - about $30 and four to six weeks - and the August 1 deadline passes while it is in the mail. Eli is disappointed. You got nothing for it.", "Una foto de una foto no es copia certificada. El DMV no puede emitir la identificación. Pides un acta de nacimiento al estado, unos $30 y de cuatro a seis semanas, y el plazo del 1 de agosto pasa mientras viene en el correo. Eli se decepciona. No ganaste nada."),
        effects: { docs: f.meeting, strain: f.strain + (f.meeting ? 0 : 1) },
        tone: f.meeting ? "good" : "bad",
      },
      {
        id: "okafor",
        label: T("Text Ms. Okafor: “Do you still have to get my documents even though I’m 18?” Then go see Eli.", "Escríbele a la Sra. Okafor: “¿Todavía tienen que conseguir mis documentos aunque ya tenga 18?” Luego ve a ver a Eli."),
        result: f.stayedTo18
          ? T("“Yes. Legally, yes.” She sounds a little embarrassed. The county requests the certified birth certificate and the Social Security card, pays the fees, and hands you a folder in July with your immunization record printed from the Health and Education Passport. You spent Saturday with your brother at a park with a broken swing. Both things were the right call.", "“Sí. Legalmente, sí.” Suena un poco avergonzada. El condado solicita el acta certificada y la tarjeta de Seguro Social, paga las cuotas, y en julio te entrega una carpeta con tu registro de vacunas impreso del Pasaporte de Salud y Educación. Pasaste el sábado con tu hermano en un parque con un columpio roto. Las dos cosas fueron la decisión correcta.")
          : T("“I’m sorry, Jordan - your case closed before 18, so that requirement doesn’t apply to us anymore. I can send you the links.” You spend Saturday with Eli at a park with a broken swing, which is not nothing. The documents are still on you.", "“Lo siento, Jordan; tu caso se cerró antes de los 18, así que ese requisito ya no nos aplica. Puedo mandarte los enlaces.” Pasas el sábado con Eli en un parque con un columpio roto, que no es poca cosa. Los documentos siguen siendo tu problema."),
        effects: { docs: f.stayedTo18 },
        rule: { text: T("When you leave care at 18 or older after 6 months in care, the agency must hand you a certified birth certificate, Social Security card, ID, medical records, and insurance information - and the duty is theirs, not yours.", "Cuando sales del sistema a los 18 o más tras 6 meses en cuidado, la agencia debe entregarte acta de nacimiento certificada, tarjeta de Seguro Social, identificación, expediente médico e información de seguro, y la obligación es de ellos, no tuya."), source: "P.L. 113-183 §113 (42 U.S.C. §675(5)(I))", url: "https://www.govtrack.us/congress/bills/113/hr4980/text" },
        tone: f.stayedTo18 ? "good" : "mixed",
      },
      {
        id: "double",
        label: T("Work the double. $180 is $180, and August is two months away.", "Trabaja el doble turno. $180 son $180, y agosto está a dos meses."),
        result: T("$180. July is busy. On July 29 you go to the DMV with what you have, and what you have is not enough. The program lets you defer to January. Eli’s foster mom mentions, kindly, that he asked if you were mad at him.", "$180. Julio está ocupado. El 29 de julio vas al DMV con lo que tienes, y lo que tienes no alcanza. El programa te deja diferir a enero. La madre de crianza de Eli menciona, con amabilidad, que él preguntó si estabas enojado con él."),
        effects: { docs: false, cash: f.cash + 180, strain: f.strain + 1 },
        tone: "bad",
      },
    ],
  },

  // ------------------------------------------------------------ 7
  {
    id: "august",
    age: T("18 years, 6 months", "18 años, 6 meses"),
    month: T("August", "Agosto"),
    title: T("August 1", "1 de agosto"),
    text: (f) => {
      const docs = f.docs;
      const paid = f.fafsa;
      return T(
        docs && paid
          ? "The EMT program starts on a Monday. You hand the coordinator an ID, a Social Security card, an immunization record, and a financial aid award that covers the whole thing. She says “great, you’re all set,” in the voice of someone for whom this is normal. It is the first time in your life a form has been easy."
          : docs
            ? "The EMT program starts on a Monday. Your documents are fine. The tuition is not, because the aid never came through the way it should have; you pay $1,600 you had been saving for a deposit, and start anyway. You will find out about the Chafee Grant in October, from a poster."
            : paid
              ? "The EMT program starts on a Monday. The money is there - a grant, not a loan - and you cannot register, because you do not have an ID and you cannot get one without a birth certificate that is in the mail. The coordinator defers you to January and is kind about it. Five months, over a piece of paper someone was supposed to hand you."
              : "The EMT program starts on a Monday without you. No ID, no aid, a birth certificate in the mail, and $1,600 you do not have. January, maybe. You are working six days a week and you are fine. That is the word you use.",
        docs && paid
          ? "El programa de paramédico empieza un lunes. Le entregas a la coordinadora una identificación, una tarjeta de Seguro Social, un registro de vacunas y una carta de ayuda financiera que cubre todo. Dice “perfecto, ya estás listo”, con la voz de alguien para quien esto es normal. Es la primera vez en tu vida que un formulario fue fácil."
          : docs
            ? "El programa de paramédico empieza un lunes. Tus documentos están bien. La colegiatura no, porque la ayuda nunca llegó como debía; pagas $1,600 que habías ahorrado para un depósito, y empiezas de todos modos. Te enterarás de la beca Chafee en octubre, por un cartel."
            : paid
              ? "El programa de paramédico empieza un lunes. El dinero está ahí, una beca, no un préstamo, y no puedes inscribirte, porque no tienes identificación y no puedes obtenerla sin un acta de nacimiento que viene en el correo. La coordinadora te difiere a enero y es amable. Cinco meses, por un papel que alguien debía entregarte."
              : "El programa de paramédico empieza un lunes sin ti. Sin identificación, sin ayuda, un acta de nacimiento en el correo y $1,600 que no tienes. Enero, tal vez. Trabajas seis días a la semana y estás bien. Esa es la palabra que usas.",
      );
    },
    choices: () => [{ id: "on", label: T("Keep going.", "Sigue adelante."), result: T("You keep going.", "Sigues adelante."), effects: {}, tone: "mixed" }],
  },
];

// ---- the ledger: what Jordan has at 19, given the choices ----
export const SILP = 1301;
export const PELL = 7395;
export const CHAFEE = 5000;

export interface Ledger {
  monthlySupport: number;
  schoolMoneyPerYear: number;
  healthTo26: boolean;
  housing: Text;
  docsWeeksLost: number;
  score: number; // 0..5
}

export function ledger(f: Flags): Ledger {
  const monthlySupport = f.stayedTo18 && f.efc && f.efcKept ? SILP : 0;
  const schoolMoneyPerYear = f.fafsa ? PELL + CHAFEE : 0;
  const healthTo26 = f.stayedTo18;
  const housing = f.stayedTo18 && f.efc
    ? f.efcKept
      ? { en: "A SILP room, paid, with a caseworker until 21", es: "Un cuarto SILP, pagado, con trabajador social hasta los 21" }
      : { en: "A SILP room, until the county closes the case", es: "Un cuarto SILP, hasta que el condado cierre el caso" }
    : f.stayedTo18
      ? { en: "Marcus’s mom’s couch; THP-Plus is still an option", es: "El sofá de la mamá de Marcus; THP-Plus sigue siendo opción" }
      : { en: "Rochelle’s spare room, and nothing if that ends", es: "El cuarto de Rochelle, y nada si eso termina" };
  const docsWeeksLost = f.docs ? 0 : 7;
  const score = (f.meeting ? 1 : 0) + (f.stayedTo18 ? 1 : 0) + (f.stayedTo18 && f.efc && f.efcKept ? 1 : 0) + (f.fafsa ? 1 : 0) + (f.docs ? 1 : 0);
  return { monthlySupport, schoolMoneyPerYear, healthTo26, housing, docsWeeksLost, score };
}

// the last page, written from the choices
export function epilogue(f: Flags): Text {
  const L = ledger(f);
  if (L.score === 5)
    return {
      en: "Nineteen. You finished the EMT program in December and you are on a rig three nights a week. The SILP room is still yours until 21 and you are saving most of the $1,301. Medi-Cal until 26, which matters because you got hurt on a call in March and it cost you nothing. Eli comes over on Sundays. None of it was luck. Every part of it was a question you asked, a date you noticed, or a form someone was required to give you - and you made them.",
      es: "Diecinueve. Terminaste el programa de paramédico en diciembre y estás en una ambulancia tres noches por semana. El cuarto SILP sigue siendo tuyo hasta los 21 y ahorras casi todo de los $1,301. Medi-Cal hasta los 26, que importa porque te lastimaste en una llamada en marzo y no te costó nada. Eli viene los domingos. Nada fue suerte. Cada parte fue una pregunta que hiciste, una fecha que notaste, o un formulario que alguien debía darte, y lograste que lo hicieran.",
    };
  if (!f.stayedTo18)
    return {
      en: "Nineteen. Rochelle’s room is still yours, and that is real. But when her lease ends in June there is no THP-Plus to catch you, no monthly payment, and no Medi-Cal after the warehouse job’s coverage lapses. Eight days. The court could have heard the case three weeks later and nothing about Rochelle’s love would have changed. Nobody in the room knew, and that is the whole reason this app exists.",
      es: "Diecinueve. El cuarto de Rochelle sigue siendo tuyo, y eso es real. Pero cuando su contrato termine en junio no hay THP-Plus que te sostenga, ni pago mensual, ni Medi-Cal cuando venza la cobertura del almacén. Ocho días. La corte pudo ver el caso tres semanas después y nada del cariño de Rochelle habría cambiado. Nadie en el cuarto lo sabía, y esa es la razón por la que existe esta app.",
    };
  if (!f.efc)
    return {
      en: "Nineteen. You are on your second couch. You still have Medi-Cal, because you were in care on your birthday, and you are two years from an age you keep not calling the county about. Re-entry is one phone call. It has been one phone call for a year. The thing nobody tells you about aging out is that the door stays open longer than you think, and it still takes something to walk back through it.",
      es: "Diecinueve. Vas en tu segundo sofá. Todavía tienes Medi-Cal, porque estabas en cuidado el día de tu cumpleaños, y estás a dos años de una edad sobre la que sigues sin llamar al condado. El reingreso es una llamada. Ha sido una llamada durante un año. Lo que nadie te dice de salir del sistema es que la puerta queda abierta más de lo que crees, y aun así cuesta volver a cruzarla.",
    };
  return {
    en: "Nineteen. Some of it worked. The room is yours, the check comes, the EMT program is either behind you or a semester away. What you lost, you lost to paperwork you did not know existed - a tax form that was not yours, a Saturday, a folder. That is not a character flaw. It is exactly the gap this app is built to close.",
    es: "Diecinueve. Parte funcionó. El cuarto es tuyo, el cheque llega, el programa de paramédico ya quedó atrás o está a un semestre. Lo que perdiste, lo perdiste por papeleo que no sabías que existía: una declaración que no era tuya, un sábado, una carpeta. Eso no es un defecto de carácter. Es exactamente la brecha que esta app quiere cerrar.",
  };
}
