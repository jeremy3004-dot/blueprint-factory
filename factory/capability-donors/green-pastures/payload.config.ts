import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig, type CollectionConfig } from "payload";

const databaseURI =
  process.env.DATABASE_URI ??
  "postgres://payload:payload@127.0.0.1:5432/payload_missing_env";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [],
};

const Treks: CollectionConfig = {
  slug: "treks",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "region", "durationDays", "difficulty"],
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "name", type: "text", required: true },
    { name: "region", type: "text", required: true },
    { name: "durationDays", type: "number", required: true, min: 1 },
    { name: "maxAltitudeM", type: "number", required: true, min: 0 },
    {
      name: "difficulty",
      type: "select",
      required: true,
      options: ["Introductory", "Moderate", "Challenging", "Expedition"],
    },
    { name: "bestSeasons", type: "array", fields: [{ name: "value", type: "text", required: true }] },
    { name: "permits", type: "array", fields: [{ name: "value", type: "text", required: true }] },
    { name: "access", type: "array", fields: [{ name: "value", type: "text", required: true }] },
    { name: "signature", type: "textarea", required: true },
    { name: "summary", type: "textarea", required: true },
    { name: "stayStyle", type: "text", required: true },
    { name: "fromUsd", type: "number", min: 0 },
    { name: "image", type: "text", required: true },
    {
      name: "bundle",
      type: "group",
      fields: [
        { name: "helicopter", type: "textarea" },
        { name: "jeep", type: "textarea" },
        { name: "flight", type: "textarea" },
      ],
    },
    {
      name: "highlights",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
    {
      name: "prep",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
    { name: "sourceSlug", type: "text", index: true },
  ],
};

const Guides: CollectionConfig = {
  slug: "guides",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "title", "gender"],
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "name", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "focus", type: "textarea", required: true },
    {
      name: "gender",
      type: "select",
      required: true,
      options: ["Women-led", "Men-led"],
    },
    { name: "languages", type: "array", fields: [{ name: "value", type: "text", required: true }] },
    { name: "specialties", type: "array", fields: [{ name: "value", type: "text", required: true }] },
    { name: "image", type: "text", required: true },
    { name: "bio", type: "textarea", required: true },
  ],
};

const Photos: CollectionConfig = {
  slug: "photos",
  admin: {
    useAsTitle: "label",
  },
  fields: [
    { name: "key", type: "text", required: true, unique: true, index: true },
    { name: "label", type: "text", required: true },
    { name: "src", type: "text", required: true },
    { name: "alt", type: "text" },
    { name: "credit", type: "text" },
  ],
};

const OperatorSources: CollectionConfig = {
  slug: "operator-sources",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "minDurationDays", "costUsd", "updatedAt"],
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "title", type: "text", required: true },
    { name: "sourceUpdatedAt", type: "date" },
    { name: "minDurationDays", type: "number", min: 0 },
    { name: "maxDurationDays", type: "number", min: 0 },
    { name: "durationType", type: "text" },
    { name: "costUsd", type: "number", min: 0 },
    { name: "sourceDifficulty", type: "text" },
    { name: "highestAltitudeM", type: "number", min: 0 },
    { name: "seasonWindow", type: "text" },
    { name: "groupSize", type: "text" },
    { name: "accommodation", type: "text" },
    { name: "activity", type: "text" },
    { name: "pagedescription", type: "textarea" },
    { name: "description", type: "array", fields: [{ name: "value", type: "textarea", required: true }] },
    { name: "highlights", type: "array", fields: [{ name: "value", type: "text", required: true }] },
    { name: "includeItems", type: "array", fields: [{ name: "value", type: "text", required: true }] },
    { name: "excludeItems", type: "array", fields: [{ name: "value", type: "text", required: true }] },
    {
      name: "facts",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text", required: true },
      ],
    },
    {
      name: "itinerary",
      type: "array",
      fields: [
        { name: "day", type: "number" },
        { name: "title", type: "text", required: true },
        { name: "details", type: "textarea" },
        { name: "ascent", type: "text" },
        { name: "distance", type: "text" },
        { name: "duration", type: "text" },
      ],
    },
  ],
};

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Treks, Guides, Photos, OperatorSources],
  db: postgresAdapter({
    pool: {
      connectionString: databaseURI,
    },
  }),
  editor: lexicalEditor(),
  routes: {
    admin: "/admin/cms",
    api: "/api/payload",
    graphQL: "/api/payload/graphql",
    graphQLPlayground: "/api/payload/graphql-playground",
  },
  secret: process.env.PAYLOAD_SECRET ?? "dev-only-payload-secret-change-me",
  typescript: {
    outputFile: "src/payload-types.ts",
  },
});
