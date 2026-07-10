import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

function iconProps(props: IconProps): IconProps {
  return {
    "aria-hidden": true,
    focusable: "false",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.75,
    viewBox: "0 0 24 24",
    ...props
  };
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M8.2 4.4 6.6 3.8a2 2 0 0 0-2.5 1.1l-.8 1.9c-.4.9-.1 2 .5 2.9l1.5 2.2a20.5 20.5 0 0 0 6.8 6.8l2.2 1.5c.9.6 2 .9 2.9.5l1.9-.8a2 2 0 0 0 1.1-2.5l-.6-1.6a2 2 0 0 0-2.1-1.3l-2.2.3a2 2 0 0 0-1.4.9l-.4.6a15.5 15.5 0 0 1-5.8-5.8l.6-.4a2 2 0 0 0 .9-1.4l.3-2.2a2 2 0 0 0-1.3-2.1Z" />
    </svg>
  );
}

export function EmailIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
