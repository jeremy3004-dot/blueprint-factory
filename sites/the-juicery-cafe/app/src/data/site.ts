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
    "Expect an international menu with Italian, American, Indian, European, and Asian influences.",
  dietary:
    "The menu includes Halal, vegetarian, vegan, and gluten-free options.",
};

export const menuHighlights = [
  { name: "Cacao & peanut butter bowl", note: "Fruit, seeds, coconut, and a richer cacao finish" },
  { name: "Millet pancake", note: "A vegan, gluten-free breakfast favorite" },
  { name: "Smoothie bowls", note: "Blended fruit, bright toppings, and plenty of texture" },
  { name: "Cold-pressed juices", note: "Pressed in small batches around what is fresh" },
] as const;

export const dayRhythm = [
  {
    time: "Morning",
    title: "Press, pour, begin.",
    note: "Cold-pressed juice, superfood smoothies, bowls, and an easy breakfast in Lakeside.",
  },
  {
    time: "At the table",
    title: "Brunch follows the season.",
    note: "A borderless, farm-to-table menu shaped by fresh produce and the board in the cafe.",
  },
  {
    time: "After hours",
    title: "The room changes rhythm.",
    note: "In season, the cafe gathers people for movement, workshops, music, and conversation.",
  },
] as const;
