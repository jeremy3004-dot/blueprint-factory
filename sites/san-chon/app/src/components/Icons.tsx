import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function MenuIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
}

export function CloseIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

export function ArrowIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M5 12h14M14 7l5 5-5 5" /></svg>;
}

export function InstagramIcon(props: IconProps) {
  return <svg {...base} {...props}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>;
}

export function PhoneIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M8.5 4.5 10 8 8 9.5c1.3 2.7 3.8 5.2 6.5 6.5l1.5-2 3.5 1.5-.5 4c-8.2.6-14.6-5.8-14-14l3.5-.5Z" /></svg>;
}

export function MapPinIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
}
