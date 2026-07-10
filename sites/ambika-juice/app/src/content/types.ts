export type MediaProvenance =
  | "reference-only"
  | "ambika-owned"
  | "licensed"
  | "generated";

export type RouteFamily =
  | "home"
  | "collection"
  | "product"
  | "editorial"
  | "cart"
  | "account"
  | "policy";

export interface MediaAsset {
  src: string;
  alt: string;
  provenance: MediaProvenance;
}

export interface CatalogueCategory {
  slug: string;
  name: string;
  description?: string;
}

export interface CatalogueProduct {
  slug: string;
  name: string;
  category: string;
  media: MediaAsset;
  description?: string;
  ingredients?: string[];
  tastingNotes?: string[];
  price?: string;
}

export interface RouteRecord {
  path: string;
  title: string;
  family: RouteFamily;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface BusinessFacts {
  name: string;
  phone: string;
  address: string;
  directionsUrl: string;
  hours?: string;
}

