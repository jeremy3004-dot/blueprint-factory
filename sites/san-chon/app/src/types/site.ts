export type NavItem = {
  label: string;
  href: string;
};

export type Favorite = {
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  imagePosition?: string;
};

export type Experience = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
};

export type MenuItem = {
  name: string;
  description: string;
};

export type MenuSection = {
  id: string;
  eyebrow: string;
  title: string;
  note: string;
  items: MenuItem[];
};
