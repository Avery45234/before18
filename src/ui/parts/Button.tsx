import type { ReactNode } from "react";

// The one button. Every button and button-looking link in the app goes through
// here, so a change to padding, color, or icon spacing happens in one place
// (this file plus the .btn rules in styles.css).
//
//   <Button href="#/setup">Start</Button>                    a link that looks like a button
//   <Button onClick={save} size="big">Save</Button>          a real button
//   <Button kind="ghost" size="small" icon={Icon.print()}>Print</Button>
//
// kind:  primary (blue, default) · ghost (white, blue text) · light (white, for photos)
//        outline (white outline, for photos) · danger (red outline) · alt (sky blue)
// size:  normal (default) · big (full width) · small

export type ButtonKind = "primary" | "ghost" | "light" | "outline" | "danger" | "alt";
export type ButtonSize = "normal" | "big" | "small";

interface Props {
  children: ReactNode;
  href?: string; // when set, renders a link
  onClick?: () => void;
  kind?: ButtonKind;
  size?: ButtonSize;
  icon?: ReactNode; // goes before the text
  iconAfter?: ReactNode; // goes after the text (arrows)
  disabled?: boolean;
  type?: "button" | "submit";
  external?: boolean; // open in a new tab
  title?: string;
  className?: string;
}

export function Button({ children, href, onClick, kind = "primary", size = "normal", icon, iconAfter, disabled, type = "button", external, title, className = "" }: Props) {
  const cls = ["btn", kind === "primary" ? "" : kind, size === "normal" ? "" : size, className].filter(Boolean).join(" ");
  const inner = (
    <>
      {icon}
      {children}
      {iconAfter}
    </>
  );
  if (href && !disabled) {
    return (
      <a className={cls} href={href} title={title} onClick={onClick} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} type={type} onClick={onClick} disabled={disabled} title={title}>
      {inner}
    </button>
  );
}
