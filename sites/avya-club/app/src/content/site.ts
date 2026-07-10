import { primaryRoutes } from "../lib/routes";

export interface NavRoute {
  readonly href: string;
  readonly label: string;
  readonly sourceUrl: string;
}

export interface Service {
  readonly slug: string;
  readonly name: string;
  readonly summary: string;
  readonly sourceUrl: string;
}

export interface MembershipGroup {
  readonly slug: string;
  readonly name: string;
  readonly options: readonly string[];
  readonly priceStatus: "needs-client-input";
  readonly sourceUrl: string;
}

export interface Testimonial {
  readonly name: string;
  readonly quote: string;
  readonly sourceUrl: string;
}

export interface MediaAsset {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly sourceUrl: string;
}

export interface PageCopyRecord {
  readonly eyebrow: string;
  readonly heading: string;
  readonly summary: string;
  readonly sectionEyebrow: string;
  readonly sectionHeading: string;
  readonly sourceUrl: string;
}

export interface SiteContent {
  readonly name: string;
  readonly sourceUrl: string;
  readonly description: string;
  readonly routes: readonly NavRoute[];
  readonly pageCopy: Readonly<
    Record<"about" | "services" | "gallery" | "contact" | "membership", PageCopyRecord>
  >;
  readonly registrationUrl: string;
  readonly contact: {
    readonly street: string;
    readonly city: string;
    readonly country: string;
    readonly hours: string;
    readonly email: string;
    readonly phones: readonly string[];
    readonly sourceUrl: string;
  };
  readonly about: {
    readonly heading: string;
    readonly summary: string;
    readonly story: string;
    readonly foundedYear: number;
    readonly campusSquareFeet: number;
    readonly nameMeaning: string;
    readonly setting: string;
    readonly inclusivity: string;
    readonly sourceUrl: string;
  };
  readonly services: readonly Service[];
  readonly memberships: readonly MembershipGroup[];
  readonly testimonials: readonly Testimonial[];
  readonly media: readonly MediaAsset[];
  readonly socialLinks: readonly {
    readonly platform: string;
    readonly href: string;
    readonly sourceUrl: string;
  }[];
}

const homeSource = "https://avya.club/";

export const siteContent = {
  name: "Avya Club",
  sourceUrl: homeSource,
  description:
    "Join Avya Club for premium gym, spa, yoga, zumba, swimming, and club house memberships in Nepal. Book your wellness experience today!",
  routes: primaryRoutes,
  pageCopy: {
    about: {
      eyebrow: "About",
      heading: "A Holistic Haven for Health, Fitness & Well-being",
      summary: "Avya Club blends fitness, healing, and mindfulness into a holistic experience.",
      sectionEyebrow: "About Avya Club",
      sectionHeading: "About Avya Club",
      sourceUrl: homeSource
    },
    services: {
      eyebrow: "Service",
      heading: "What We Provide",
      summary:
        "Achieve peak fitness with our modern gym, dynamic training programs, and expert nutrition plans.",
      sectionEyebrow: "What We Provide",
      sectionHeading: "Core Level Facilities",
      sourceUrl: homeSource
    },
    gallery: {
      eyebrow: "Gallery",
      heading: "Gallery",
      summary: "Avya Club blends fitness, healing, and mindfulness into a holistic experience.",
      sectionEyebrow: "Gallery",
      sectionHeading: "Explore AVYA CLUB",
      sourceUrl: homeSource
    },
    contact: {
      eyebrow: "Contact",
      heading: "CONTACT US",
      summary: "Gharipatan, Pokhara",
      sectionEyebrow: "Gharipatan, Pokhara, Nepal",
      sectionHeading: "Get In Touch",
      sourceUrl: homeSource
    },
    membership: {
      eyebrow: "Join Us Today",
      heading: "Our Services & Pricing",
      summary: "Gym | Functional Fitness | Nutrition",
      sectionEyebrow: "Join Us Now",
      sectionHeading: "Join Us Today",
      sourceUrl: homeSource
    }
  },
  registrationUrl: "https://avya.club/register",
  contact: {
    street: "Gharipatan",
    city: "Pokhara",
    country: "Nepal",
    hours: "Open 24/7",
    email: "info@avya.club",
    phones: ["061-590648", "9802855271"],
    sourceUrl: homeSource
  },
  about: {
    heading: "A Holistic Haven for Health, Fitness & Well-being",
    summary:
      "Avya Club blends fitness, healing, and mindfulness into a holistic experience.",
    story:
      "Founded in 2018, Avya Club was created to redefine health and wellness in Nepal. Inspired by the Sanskrit word Avya, meaning “pure” and “first light,” the club blends fitness, healing, and mindfulness in a space for personal growth, recovery, and peak performance.",
    foundedYear: 2018,
    campusSquareFeet: 110000,
    nameMeaning: "pure and first light",
    setting: "The 110,000-square-foot campus has breathtaking Himalayan views.",
    inclusivity: "Its inclusive facilities welcome all ages and fitness levels.",
    sourceUrl: homeSource
  },
  services: [
    {
      slug: "swimming-pool",
      name: "Swimming Pool",
      summary: "Train, swim, and relax",
      sourceUrl: homeSource
    },
    {
      slug: "gym-fitness",
      name: "GYM & Fitness",
      summary: "Strength and endurance",
      sourceUrl: homeSource
    },
    {
      slug: "functional-fitness",
      name: "Functional Fitness",
      summary: "Core strength workouts",
      sourceUrl: homeSource
    },
    {
      slug: "tennis-court",
      name: "Tennis Court",
      summary: "Play, train, compete",
      sourceUrl: homeSource
    },
    {
      slug: "physiotherapy",
      name: "Physiotherapy",
      summary: "Recover and heal",
      sourceUrl: homeSource
    },
    {
      slug: "massage-spa",
      name: "Massage & Spa",
      summary: "Relax and rejuvenate",
      sourceUrl: homeSource
    },
    {
      slug: "club-house",
      name: "Club House",
      summary: "Socialize and unwind",
      sourceUrl: homeSource
    },
    {
      slug: "wellbeing-nutrition",
      name: "Well-being & Nutrition",
      summary: "Balance and vitality",
      sourceUrl: homeSource
    }
  ],
  memberships: [
    {
      slug: "gym-functional-fitness",
      name: "Gym & Functional Fitness",
      options: [
        "Daily Pass",
        "Monthly Membership",
        "3-Month Membership",
        "6-Month Membership",
        "Yearly Membership"
      ],
      priceStatus: "needs-client-input",
      sourceUrl: homeSource
    },
    {
      slug: "spa-wellness",
      name: "Spa & Wellness",
      options: [
        "Trekkers’ Healing Therapy",
        "Ayurvedic Massage",
        "Deep Tissue Massage",
        "Shirodhara Massage"
      ],
      priceStatus: "needs-client-input",
      sourceUrl: homeSource
    },
    {
      slug: "group-classes",
      name: "Yoga, Meditation, Zumba, Aerobics",
      options: ["Yoga", "Zumba"],
      priceStatus: "needs-client-input",
      sourceUrl: homeSource
    },
    {
      slug: "swimming-pool",
      name: "Swimming Pool",
      options: ["Adults", "Kids"],
      priceStatus: "needs-client-input",
      sourceUrl: homeSource
    },
    {
      slug: "club-house",
      name: "Club House Membership",
      options: ["Single Membership", "Couple Membership"],
      priceStatus: "needs-client-input",
      sourceUrl: homeSource
    },
    {
      slug: "limited-time-offer",
      name: "Limited Time Offer",
      options: ["Gym + Zumba + Cardio"],
      priceStatus: "needs-client-input",
      sourceUrl: homeSource
    },
    {
      slug: "spa-therapy",
      name: "Spa Therapy",
      options: [
        "Ayurvedic Therapy",
        "Deep Tissue Therapy",
        "Shirodhara",
        "Neck / Foot Massage",
        "Trekking Massage"
      ],
      priceStatus: "needs-client-input",
      sourceUrl: homeSource
    }
  ],
  testimonials: [],
  media: [
    {
      id: "logo-main",
      src: "https://avya.club/assets/img/avya/avyamain1.png",
      alt: "Avya Club logo",
      width: 133,
      height: 72,
      sourceUrl: homeSource
    },
    {
      id: "about",
      src: "https://avya.club/assets/img/avya/aboutphoto.png",
      alt: "About Avya Club",
      width: 620,
      height: 640,
      sourceUrl: homeSource
    },
    {
      id: "identity",
      src: "https://avya.club/assets/img/avya/avya.png",
      alt: "Avya Club",
      width: 1998,
      height: 1124,
      sourceUrl: homeSource
    },
    {
      id: "club-house",
      src: "https://serveravya.onrender.com/api/media/file/club2.jpg",
      alt: "Avya Club House",
      width: 6240,
      height: 4160,
      sourceUrl: "https://serveravya.onrender.com/api/media/file/club2.jpg"
    }
  ],
  socialLinks: [
    {
      platform: "Facebook",
      href: "https://www.facebook.com/AvyaClub",
      sourceUrl: homeSource
    },
    {
      platform: "Instagram",
      href: "https://www.instagram.com/avyaclub/",
      sourceUrl: homeSource
    },
    {
      platform: "YouTube",
      href: "https://www.youtube.com/channel/UCj1t80ccui3Y0wjBEmGnwMg",
      sourceUrl: homeSource
    },
    {
      platform: "TikTok",
      href: "https://www.tiktok.com/discover/avya-club?lang=en",
      sourceUrl: homeSource
    }
  ]
} as const satisfies SiteContent;
