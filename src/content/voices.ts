// Real people, in their own words, as published. Nothing here is composite or
// paraphrased. Names are printed the way the source printed them (Human Rights
// Watch used first names and an initial to protect people). Every entry links to
// where it came from so a reader can check.
//
// The quotes stay in English on purpose: they are what the person said.

export interface Voice {
  id: string;
  quote: string;
  who: string; // name as printed
  where: string; // city, age, or program, as printed
  context: string; // one plain sentence: what was happening
  source: { name: string; url: string; year: number };
}

const HRW = {
  name: "Human Rights Watch, My So-Called Emancipation",
  url: "https://www.hrw.org/report/2010/05/12/my-so-called-emancipation/foster-care-homelessness-california-youth",
  year: 2010,
};

export const voices: Voice[] = [
  {
    id: "karen",
    quote: "The day I graduated from high school my foster mom told me, ‘You’ve been emancipated. You can’t live here anymore.’",
    who: "Karen D.",
    where: "San Francisco",
    context: "Taken straight from graduation to a shelter.",
    source: HRW,
  },
  {
    id: "nicole",
    quote: "It was the only foster home I’d ever been in and suddenly I felt as though all my fears were coming true and all my dreams were ruined.",
    who: "Nicole Childers",
    where: "California, now an editor at NBC News",
    context: "Asked to leave her foster home the day after high school graduation, 1995, while loading laundry. A school administrator let her stay the summer.",
    source: { name: "TODAY, first-person essay", url: "https://www.today.com/parents/essay/foster-care-aging-out-homelessness-rcna53014", year: 2022 },
  },
  {
    id: "roberta",
    quote: "On the day of my so-called emancipation, I didn’t have a high school diploma, a place to live, a job, nothing.",
    who: "Roberta E.",
    where: "Los Angeles",
    context: "Left care with nothing in hand and was later homeless.",
    source: HRW,
  },
  {
    id: "lestat",
    quote: "The same day that I graduated from high school, my group home social worker told me, ‘I’m taking you to a shelter.’",
    who: "Lestat",
    where: "age 18",
    context: "Emancipated from a group home on graduation day.",
    source: HRW,
  },
  {
    id: "warren",
    quote: "I was told on Wednesday that I had until Saturday to move out of the group home where I was staying.",
    who: "Warren H.",
    where: "California",
    context: "Three days’ notice. Two years homeless afterward, some of it in a car.",
    source: HRW,
  },
  {
    id: "aaron",
    quote: "Sometimes you think it’s better to be in jail or dead. But I tried to think positive about it. My Pontiac was comfortable.",
    who: "Aaron T.",
    where: "California",
    context: "Slept in his car after turning 18 in a group home.",
    source: HRW,
  },
  {
    id: "michael",
    quote: "She gave me five bucks out of her own purse.",
    who: "Michael Y.",
    where: "California",
    context: "What his probation officer handed him when she dropped him at a homeless shelter.",
    source: HRW,
  },
  {
    id: "anya",
    quote: "While in a group home there were so many things I couldn’t do. I couldn’t even learn how to ride the bus on my own.",
    who: "Anya F.",
    where: "California",
    context: "Homeless for more than two years after leaving group homes.",
    source: HRW,
  },
  {
    id: "nikki",
    quote: "I wish I could have had someone to care about me, like show me how to separate the whites from the darks.",
    who: "Nikki B.",
    where: "California",
    context: "On what she needed and did not get before leaving care.",
    source: HRW,
  },
  {
    id: "tony",
    quote: "If you’re going to put kids in group homes, in foster care, at least give them what they need to survive and take care of themselves.",
    who: "Tony D.",
    where: "California",
    context: "Speaking from a homeless shelter.",
    source: HRW,
  },
  {
    id: "angela",
    quote: "When the system that had promised to step in as guardians suddenly stepped out, it felt cold and sterile, like the air in a hospital room that is clean but void of warmth or comfort.",
    who: "Ángela Banks",
    where: "North Carolina",
    context: "Told by email to pack her things. One week to find housing. A $450 Craigslist room and two-hour walks home.",
    source: { name: "The Imprint, Youth Voices Rising", url: "https://imprintnews.org/youth-voice/so-what-do-i-do-now-the-impossible-leap-we-ask-youth-to-make/267998", year: 2025 },
  },
  {
    id: "destiny",
    quote: "I was 16 the first time I realized how invisible I could be. No permanent address, no one to call in an emergency, no photos of me on a mantle.",
    who: "Destiny Jackson",
    where: "Georgia, now at Spelman College",
    context: "Did AP classes and college applications from a youth shelter.",
    source: { name: "The Imprint, Youth Voices Rising", url: "https://imprintnews.org/youth-voice/hear-me-out-foster-youth-deserve-to-be-heard-seen-and-supported/260516", year: 2025 },
  },
];

// longer reading, for anyone who wants the whole picture
export const reading = [
  { name: "I aged out of foster care on my 18th birthday. Here is what happened next.", by: "Nicole Childers, TODAY, 2022. The essay that started this project.", url: "https://www.today.com/parents/essay/foster-care-aging-out-homelessness-rcna53014" },
  { name: "My So-Called Emancipation: From Foster Care to Homelessness for California Youth", by: "Human Rights Watch, 2010", url: HRW.url },
  { name: "Aging Out of Foster Care in Los Angeles", by: "California Policy Lab, 2024", url: "https://capolicylab.org/aging-out-of-foster-care-in-los-angeles/" },
  { name: "1 in 4 California Foster Youth Become Homeless After Leaving Extended Care", by: "The Imprint, on the CalYOUTH study", url: "https://imprintnews.org/research-news/1-in-4-california-foster-youth-become-homeless-after-leaving-extended-care/51263" },
  { name: "Youth Voices Rising", by: "Essays by current and former foster youth, The Imprint", url: "https://imprintnews.org/best-of-2024/best-of-youth-voices-rising-2024/256906" },
];
