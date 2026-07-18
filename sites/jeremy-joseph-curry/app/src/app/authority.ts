import type { Metadata } from "next";

export const SITE_ORIGIN = "https://jeremyjosephcurry.com";
export const AUTHOR_NAME = "Jeremy Joseph Curry";
export const AUTHOR_URL = `${SITE_ORIGIN}/about`;
export const PERSON_ID = `${SITE_ORIGIN}/#person`;
export const PORTRAIT_ALT =
  "Portrait of Jeremy Joseph Curry, software engineer and app developer in Nepal";
export const PORTRAIT_IMAGES = [
  `${SITE_ORIGIN}/images/jeremy-joseph-curry-1x1.jpg`,
  `${SITE_ORIGIN}/images/jeremy-joseph-curry-4x3.jpg`,
  `${SITE_ORIGIN}/images/jeremy-joseph-curry-16x9.jpg`
] as const;
export const SOCIAL_IMAGE = PORTRAIT_IMAGES[2];
export const VERIFIED_PROFILE_LINKS = [
  "https://github.com/jeremy3004-dot",
  "https://apps.apple.com/us/developer/jeremy-joseph-curry/id1867562495"
] as const;

export const personJsonLd = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: AUTHOR_NAME,
  url: `${SITE_ORIGIN}/`,
  jobTitle: "Software Engineer & App Developer",
  description:
    "Software engineer and independent app developer based in Nepal, building mobile apps, web applications, websites, backend systems, and AI-powered software.",
  homeLocation: {
    "@type": "Country",
    name: "Nepal"
  },
  image: [...PORTRAIT_IMAGES],
  sameAs: [...VERIFIED_PROFILE_LINKS]
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": `${SITE_ORIGIN}/#website`,
  name: AUTHOR_NAME,
  url: `${SITE_ORIGIN}/`,
  description:
    "Personal website for Jeremy Joseph Curry, a software engineer and app developer based in Nepal."
};

export const profilePageJsonLd = {
  "@type": "ProfilePage",
  "@id": `${SITE_ORIGIN}/about#profile-page`,
  url: `${SITE_ORIGIN}/about`,
  name: "About Jeremy Joseph Curry | Software Engineer in Nepal",
  description:
    "About Jeremy Joseph Curry, a software engineer and independent app developer based in Nepal.",
  mainEntity: {
    "@id": PERSON_ID
  }
};

export function authorityGraph(nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes
  };
}

type PageMetadataInput = {
  path: string;
  title: string;
  description: string;
  type: "website" | "profile" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function createPageMetadata({
  path,
  title,
  description,
  type,
  publishedTime,
  modifiedTime
}: PageMetadataInput): Metadata {
  const url = path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
  const image = {
    url: SOCIAL_IMAGE,
    width: 1200,
    height: 675,
    alt: PORTRAIT_ALT
  };
  const openGraphBase = {
    url,
    title,
    description,
    siteName: AUTHOR_NAME,
    locale: "en_US",
    images: [image]
  };
  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          ...openGraphBase,
          type: "article",
          authors: [AUTHOR_URL],
          ...(publishedTime ? { publishedTime } : {}),
          ...(modifiedTime ? { modifiedTime } : {})
        }
      : type === "profile"
        ? {
            ...openGraphBase,
            type: "profile",
            firstName: "Jeremy Joseph",
            lastName: "Curry"
          }
        : { ...openGraphBase, type: "website" };

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: SOCIAL_IMAGE,
          alt: PORTRAIT_ALT
        }
      ]
    }
  };
}

export function articleJsonLd({
  path,
  title,
  description
}: {
  path: string;
  title: string;
  description: string;
}) {
  const url = `${SITE_ORIGIN}${path}`;
  return authorityGraph([
    {
      "@type": "Article",
      "@id": `${url}#article`,
      url,
      headline: title,
      description,
      mainEntityOfPage: {
        "@id": url
      },
      author: {
        "@id": PERSON_ID
      }
    }
  ]);
}

export function publishedArticleJsonLd({
  path,
  title,
  description,
  datePublished,
  dateModified
}: {
  path: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
}) {
  const url = `${SITE_ORIGIN}${path}`;
  return authorityGraph([
    {
      "@type": "Article",
      "@id": `${url}#article`,
      url,
      headline: title,
      description,
      mainEntityOfPage: {
        "@id": url
      },
      author: {
        "@id": PERSON_ID
      },
      image: [SOCIAL_IMAGE],
      datePublished,
      dateModified
    }
  ]);
}

export function writingCollectionJsonLd({
  path,
  title,
  description,
  articles
}: {
  path: string;
  title: string;
  description: string;
  articles: { path: string; title: string }[];
}) {
  const url = `${SITE_ORIGIN}${path}`;
  const listId = `${url}#article-list`;
  return authorityGraph([
    {
      "@type": "CollectionPage",
      "@id": `${url}#collection-page`,
      url,
      name: title,
      description,
      author: {
        "@id": PERSON_ID
      },
      mainEntity: {
        "@id": listId
      }
    },
    {
      "@type": "ItemList",
      "@id": listId,
      name: "Jeremy Joseph Curry engineering articles",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => {
        const articleUrl = `${SITE_ORIGIN}${article.path}`;
        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@id": `${articleUrl}#article`,
            url: articleUrl,
            name: article.title
          }
        };
      })
    }
  ]);
}
