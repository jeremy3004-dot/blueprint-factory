export const contact = {
  hours: "7:30am–11pm",
  address: "Lakeside near Street 22A, opposite Three Sisters Guesthouse, Pokhara 33700, Nepal",
  phoneDisplay: "+977 982-3781787",
  phoneHref: "tel:+9779823781787",
  whatsappDisplay: "+61 413 386 270",
  whatsappHref: "https://wa.me/61413386270",
  email: "justacigar@hotmail.com",
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=The+Juicery+Cafe+Lakeside+Pokhara+Nepal",
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/food", label: "Food & drink" },
  { href: "/events", label: "Events" },
  { href: "/weekend-market", label: "Weekend market" },
  { href: "/fresh-baskets", label: "Fresh baskets" },
  { href: "/faq-s", label: "FAQs" },
  { href: "/contact", label: "Contact" },
] as const;

export const facts = {
  story:
    "The Juicery Cafe began in North Lakeside as a cold-pressed juice bar and grew into a Pokhara food destination shaped by seasonal produce, inventive brunch, and a farm-to-table approach.",
  food:
    "Cold-pressed juices, superfood smoothies, vegan smoothie bowls, and a borderless brunch menu bring the cafe's farm-to-table idea to the plate.",
  cleansing:
    "The cafe offers a three-day juice detox and cleansing programme supervised by an experienced Ayurveda practitioner.",
  events:
    "In season, the Juicery hosts yoga, fitness classes, workshops, weekly kirtan, open-mic jamming, and art talks.",
  menuRange:
    "The cafe's claimed TripAdvisor listing describes an international menu with Italian, American, Indian, European, and Asian influences.",
  dietary:
    "The claimed listing identifies the menu as Halal with vegetarian, vegan, and gluten-free options.",
};

export const menuHighlights = [
  { name: "Cacao & peanut butter bowl", note: "Shown in the cafe's TripAdvisor gallery" },
  { name: "Millet pancake", note: "Vegan and gluten-free" },
  { name: "Smoothie bowls", note: "Vegan" },
] as const;
