import { useEffect, useState } from "react";
import type { Lang, Profile } from "../model/profile";
import { loadProfile, saveProfile } from "../model/profile";
import { LangContext, loadLang, saveLang, useT, useLang, LANGS } from "../i18n";
import { Home } from "./screens/Home";
import { Setup } from "./screens/Setup";
import { TimelineScreen } from "./screens/Timeline";
import { WhatIfScreen } from "./screens/WhatIf";
import { StoryScreen } from "./screens/Story";
import { ToolkitScreen } from "./screens/Toolkit";
import { RightsScreen } from "./screens/Rights";
import { DocumentsScreen } from "./screens/Documents";
import { MeetingScreen } from "./screens/Meeting";
import { AffordScreen } from "./screens/Afford";
import { HelpScreen } from "./screens/Help";
import { AboutScreen } from "./screens/About";
import { ShareScreen } from "./screens/Share";
import { FlyerScreen } from "./screens/Flyer";
import { LettersScreen } from "./screens/Letters";
import { VoicesScreen } from "./screens/Voices";
import { WhyScreen } from "./screens/Why";
import { Icon, type IconName } from "./icons";
import { Logo } from "./Logo";

// Tiny "router": the part after # in the address (#/timeline) says which screen to
// show, so a link can be shared or bookmarked and the app still works offline as
// one file. The browser fires a "hashchange" event whenever that part changes:
// https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event
export type Route = "home" | "setup" | "timeline" | "whatif" | "story" | "toolkit" | "rights" | "documents" | "meeting" | "afford" | "help" | "about" | "share" | "flyer" | "letters" | "voices" | "why";
const ROUTES: Route[] = ["home", "setup", "timeline", "whatif", "story", "toolkit", "rights", "documents", "meeting", "afford", "help", "about", "share", "flyer", "letters", "voices", "why"];

function readRoute(): Route {
  const h = (window.location.hash || "#/").replace(/^#\/?/, "");
  const r = h.split("?")[0] as Route;
  return ROUTES.includes(r) ? r : "home";
}

export function go(r: Route) {
  window.location.hash = r === "home" ? "/" : `/${r}`;
}

export function App() {
  const [route, setRoute] = useState<Route>(readRoute);
  const [lang, setLangState] = useState<Lang>(loadLang);
  // ?demo=1 seeds a sample 17-year-old so the app can be shown without typing
  // anyone's real details (used for the demo video and screenshots)
  const [profile, setProfile] = useState<Profile | null>(() => {
    const saved = loadProfile();
    if (saved?.birthdate) return saved;
    if (new URLSearchParams(window.location.search).has("demo")) {
      const b = new Date();
      b.setFullYear(b.getFullYear() - 17);
      b.setMonth(b.getMonth() - 5);
      return { birthdate: b.toISOString().slice(0, 10), state: "CA", county: "Los Angeles", inCareNow: "yes", inCareOn18: "yes", inCareAfter13: "yes", inCare16to18: "yes", sixMonthsInCare: "yes", planning: "college", parenting: false };
    }
    return null;
  });

  useEffect(() => {
    const on = () => {
      setRoute(readRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    saveLang(l);
    document.documentElement.lang = l;
  };

  const updateProfile = (p: Profile) => {
    setProfile(p);
    saveProfile(p);
  };

  // screens that need a profile bounce to setup
  const needsProfile = route === "timeline" || route === "whatif";
  const effective: Route = needsProfile && !profile?.birthdate ? "setup" : route;

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <Shell route={effective}>
        {effective === "home" && <Home profile={profile} />}
        {effective === "setup" && <Setup initial={profile} onSave={(p) => { updateProfile(p); go("timeline"); }} />}
        {effective === "timeline" && profile && <TimelineScreen profile={profile} />}
        {effective === "whatif" && profile && <WhatIfScreen profile={profile} />}
        {effective === "story" && <StoryScreen />}
        {effective === "toolkit" && <ToolkitScreen />}
        {effective === "rights" && <RightsScreen />}
        {effective === "documents" && <DocumentsScreen />}
        {effective === "meeting" && <MeetingScreen profile={profile} />}
        {effective === "afford" && <AffordScreen />}
        {effective === "help" && <HelpScreen />}
        {effective === "about" && <AboutScreen />}
        {effective === "share" && <ShareScreen />}
        {effective === "flyer" && <FlyerScreen />}
        {effective === "letters" && <LettersScreen profile={profile} />}
        {effective === "voices" && <VoicesScreen />}
        {effective === "why" && <WhyScreen />}
      </Shell>
    </LangContext.Provider>
  );
}

function Shell({ route, children }: { route: Route; children: React.ReactNode }) {
  const t = useT();
  const { lang, setLang } = useLang();
  const inToolkit = route === "toolkit" || route === "rights" || route === "documents" || route === "meeting" || route === "afford" || route === "share" || route === "flyer" || route === "letters";
  const tabs: { r: Route; label: string; icon: IconName; on: boolean }[] = [
    { r: "timeline", label: t.nav.timeline, icon: "calendar", on: route === "timeline" || route === "setup" },
    { r: "whatif", label: t.nav.whatif, icon: "branch", on: route === "whatif" },
    { r: "story", label: t.nav.story, icon: "book", on: route === "story" },
    { r: "toolkit", label: t.nav.toolkit, icon: "tools", on: inToolkit },
    { r: "help", label: t.nav.help, icon: "phone", on: route === "help" },
  ];
  return (
    <div className={`shell ${route === "home" ? "is-home" : ""}`}>
      <header className="top">
        <a className="brand" href="#/" aria-label={t.appName}><Logo height={24} /></a>
        <nav className="topnav">
          {tabs.map((tb) => (
            <a key={tb.r} href={`#/${tb.r}`} className={tb.on ? "on" : ""}>{tb.label}</a>
          ))}
          <a href="#/why" className={route === "why" ? "on" : ""}>{t.nav.why}</a>
          <a href="#/about" className={route === "about" ? "on" : ""}>{t.nav.about}</a>
        </nav>
        <select className="lang" value={lang} onChange={(e) => setLang(e.target.value as typeof lang)} aria-label={t.common.language}>
          {LANGS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
        </select>
      </header>
      <main className="page" key={route}>
        {route !== "home" && <div className="page-label">{t.labels[route]}</div>}
        {children}
        <footer className="foot">
          <a href="#/why">{t.why.title}</a>
          <a href="#/voices">{t.voices.title}</a>
          <a href="#/about">{t.nav.about}</a>
          <a href="#/share">{t.share.title}</a>
          <a href="for-organizations.html">{({ en: "For organizations", es: "Para organizaciones", vi: "Dành cho tổ chức", zh: "机构使用指南" })[lang]}</a>
        </footer>
      </main>
      <nav className="bottomnav" aria-label="Sections">
        {tabs.map((tb) => (
          <a key={tb.r} href={`#/${tb.r}`} className={tb.on ? "on" : ""}>
            {Icon[tb.icon]()}
            <span>{tb.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
