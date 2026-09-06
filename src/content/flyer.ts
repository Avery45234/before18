// Everything printed on the one-page flyer. English only on purpose: it is for
// the adults, and the app itself does the languages. Edit words here, layout in
// src/ui/screens/Flyer.tsx.

export const flyer = {
  headline: "Turning 18 in foster care comes with a calendar.",
  sub: "Most youth never see it. Here it is.",

  calendar: [
    { age: "14", what: "Written list of your rights. Agency pulls your credit report every year from now on." },
    { age: "16", what: "ILP (Independent Living Program) starts: ask who your coordinator is. Time in care from 16 to 18 qualifies you for the Chafee Grant." },
    { age: "90 days before 18", what: "Transition plan meeting, required by federal law. Housing, health coverage, school, work, a mentor. Bring your attorney and one adult you choose." },
    { age: "18th birthday", what: "The day that decides the most. In care on this day: Medi-Cal to 26, extended foster care to 21, THP-Plus housing. Sign the Mutual Agreement (SOC 162) before it.", key: true },
    { age: "18 to 21", what: "Extended foster care: a placement or about $1,301 a month to live on your own (SILP). Left? Re-enter any time before 21 (SOC 163)." },
    { age: "to 25", what: "THP-Plus transitional housing, up to 36 months." },
    { age: "to 26", what: "Free Medi-Cal under the Former Foster Youth program. Chafee Grant up to $5,000 a year for school or training. FAFSA: answer yes to the foster care question, no parent information needed." },
  ],

  ruleTitle: "The one rule",
  rule: "Being in foster care on the 18th birthday is the test for free health coverage to 26, extended care to 21, and THP-Plus housing. A guardianship or reunification dated the week before turns all three off. Ask for the date to be on or after the birthday.",

  docsTitle: "Leave with these in hand",
  documents: ["Certified birth certificate", "Social Security card", "California ID or driver's license", "Medi-Cal card and BIC number", "Medical and immunization records", "School transcripts and IEP", "Court proof of foster care", "Most recent credit report"],
  docsNote: "Federal law, 42 U.S.C. 675(5)(I). Do not sign exit paperwork without them.",

  callTitle: "Who to call",
  phones: [
    { number: "1-877-846-1602", who: "California Foster Care Ombudsperson" },
    { number: "988", who: "Crisis line, call or text, any hour" },
    { number: "1-800-786-2929", who: "National Runaway Safeline, or text 66008" },
    { number: "211", who: "Local shelter, food, and housing help" },
  ],

  blurb: "turns a birthdate and five questions into this calendar for one person: what is open now, what opens and closes when, what one decision would cost, and the questions to bring to the meeting. Free. No account. Works offline. English, Spanish, Vietnamese, Chinese.",
  staff: "hand this to youth at 16 when ILP starts and again at the transition meeting. Every rule in the app cites its official source and the date it was checked. Not legal advice. Sources: cdss.ca.gov, dhcs.ca.gov, csac.ca.gov, 42 U.S.C. 675.",
};
