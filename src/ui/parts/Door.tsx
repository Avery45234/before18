import { Icon, type IconName } from "../icons";

// A card that is a link: icon, title, one line of text, arrow. Used for the
// toolkit grid and the "what to do with this" list on the home page.
//
//   <Door href="#/story" icon="book" title="..." text="..." />

export function Door({ href, icon, title, text }: { href: string; icon: IconName; title: string; text: string }) {
  return (
    <a className="door" href={href}>
      <span className="door-icon" aria-hidden>{Icon[icon]()}</span>
      <span className="door-body">
        <span className="door-title">{title}</span>
        <span className="door-text">{text}</span>
      </span>
      <span className="door-go" aria-hidden>{Icon.arrow()}</span>
    </a>
  );
}
