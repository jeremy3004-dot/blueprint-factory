export type AdminIdentity = {
  email: string;
  role: "super_admin" | "admin";
  source: "cloudflare-access" | "local-password" | "local-dev" | "disabled";
};

const ADMIN_SESSION_COOKIE = "alpine_bloom_admin_session";
const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 12;

export const adminAuthReadiness = {
  accessAudienceConfigured: Boolean(process.env.CLOUDFLARE_ACCESS_AUD),
  accessTeamDomainConfigured: Boolean(process.env.CLOUDFLARE_ACCESS_TEAM_DOMAIN),
  passwordAuthConfigured: Boolean(
    process.env.ADMIN_BOOTSTRAP_EMAIL &&
      (process.env.ADMIN_BOOTSTRAP_PASSWORD || process.env.ADMIN_BOOTSTRAP_PASSWORD_SHA256) &&
      process.env.ADMIN_SESSION_SECRET,
  ),
};

type AccessJwtPayload = {
  aud?: string | string[];
  email?: string;
  exp?: number;
  iss?: string;
  sub?: string;
};

type AdminSessionPayload = {
  email: string;
  exp: number;
};

function resolveSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "";
}

function resolveAdminRole(email: string): AdminIdentity["role"] {
  const superAdmins = (
    process.env.ADMIN_SUPERADMIN_EMAILS ||
    process.env.ADMIN_SUPERADMIN_EMAIL ||
    "jeremyjcurry@gmail.com"
  )
    .split(",")
    .map((candidate) => candidate.trim().toLowerCase())
    .filter(Boolean);

  return superAdmins.includes(email.toLowerCase()) ? "super_admin" : "admin";
}

function base64UrlEncode(value: string | Uint8Array) {
  const bytes = typeof value === "string" ? new TextEncoder().encode(value) : value;

  return Buffer.from(bytes).toString("base64url");
}

function base64UrlToBuffer(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function parseJwtPart<T>(value: string): T | null {
  try {
    return JSON.parse(new TextDecoder().decode(base64UrlToBuffer(value))) as T;
  } catch {
    return null;
  }
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function signAdminSessionPayload(payload: string) {
  const secret = resolveSessionSecret();
  if (!secret) return null;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { hash: "SHA-256", name: "HMAC" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));

  return base64UrlEncode(new Uint8Array(signature));
}

function readCookie(headers: Headers, name: string) {
  const cookieHeader = headers.get("cookie");
  if (!cookieHeader) return null;

  return (
    cookieHeader
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(`${name}=`))
      ?.slice(name.length + 1) ?? null
  );
}

export async function verifyAdminPassword(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_BOOTSTRAP_EMAIL?.trim().toLowerCase();
  if (!expectedEmail || email.trim().toLowerCase() !== expectedEmail) return null;

  const expectedHash = process.env.ADMIN_BOOTSTRAP_PASSWORD_SHA256;
  const expectedPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD;
  if (!expectedHash && !expectedPassword) return null;

  const candidateHash = await sha256(password);
  const passwordValid = expectedHash
    ? candidateHash === expectedHash.toLowerCase()
    : password === expectedPassword;

  if (!passwordValid) return null;

  return {
    email: expectedEmail,
    role: resolveAdminRole(expectedEmail),
    source: "local-password" as const,
  };
}

export async function createAdminSessionCookie(email: string) {
  const payload = base64UrlEncode(
    JSON.stringify({
      email,
      exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_TTL_SECONDS,
    } satisfies AdminSessionPayload),
  );
  const signature = await signAdminSessionPayload(payload);

  if (!signature) return null;

  return `${ADMIN_SESSION_COOKIE}=${payload}.${signature}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${ADMIN_SESSION_TTL_SECONDS}`;
}

export function clearAdminSessionCookie() {
  return `${ADMIN_SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

async function getAdminIdentityFromSessionCookie(headers: Headers): Promise<AdminIdentity | null> {
  const sessionCookie = readCookie(headers, ADMIN_SESSION_COOKIE);
  if (!sessionCookie) return null;

  const [payload, signature] = sessionCookie.split(".");
  if (!payload || !signature) return null;

  const expectedSignature = await signAdminSessionPayload(payload);
  if (!expectedSignature || expectedSignature !== signature) return null;

  const session = parseJwtPart<AdminSessionPayload>(payload);
  if (!session?.email || session.exp <= Math.floor(Date.now() / 1000)) return null;

  return {
    email: session.email,
    role: resolveAdminRole(session.email),
    source: "local-password",
  };
}

function normalizeTeamDomain(value: string) {
  const trimmed = value.trim().replace(/\/$/, "");

  return trimmed.startsWith("https://") ? trimmed : `https://${trimmed}`;
}

async function verifyCloudflareAccessJwt(token: string): Promise<AccessJwtPayload | null> {
  const teamDomain = process.env.CLOUDFLARE_ACCESS_TEAM_DOMAIN;
  const expectedAud = process.env.CLOUDFLARE_ACCESS_AUD;

  if (!teamDomain || !expectedAud) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const header = parseJwtPart<{ alg?: string; kid?: string }>(parts[0]);
  const payload = parseJwtPart<AccessJwtPayload>(parts[1]);
  if (!header?.kid || header.alg !== "RS256" || !payload) return null;

  const issuer = normalizeTeamDomain(teamDomain);
  if (payload.iss !== issuer) return null;

  const audiences = Array.isArray(payload.aud) ? payload.aud : payload.aud ? [payload.aud] : [];
  if (!audiences.includes(expectedAud)) return null;

  if (payload.exp && payload.exp <= Math.floor(Date.now() / 1000)) return null;

  try {
    const certResponse = await fetch(`${issuer}/cdn-cgi/access/certs`, {
      cache: "force-cache",
      next: { revalidate: 3600 },
    });
    if (!certResponse.ok) return null;

    const jwks = (await certResponse.json()) as {
      keys?: Array<JsonWebKey & { kid?: string }>;
    };
    const key = jwks.keys?.find((candidate) => candidate.kid === header.kid);
    if (!key) return null;

    const cryptoKey = await crypto.subtle.importKey(
      "jwk",
      key,
      { hash: "SHA-256", name: "RSASSA-PKCS1-v1_5" },
      false,
      ["verify"],
    );
    const signature = base64UrlToBuffer(parts[2]);
    const signedPayload = new TextEncoder().encode(`${parts[0]}.${parts[1]}`);
    const valid = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      cryptoKey,
      signature,
      signedPayload,
    );

    return valid ? payload : null;
  } catch {
    return null;
  }
}

export async function getAdminIdentityFromHeaders(headers: Headers): Promise<AdminIdentity | null> {
  const accessJwt = headers.get("cf-access-jwt-assertion");
  if (accessJwt) {
    const payload = await verifyCloudflareAccessJwt(accessJwt);
    const email = payload?.email || payload?.sub;

    if (email) {
      return {
        email,
        role: resolveAdminRole(email),
        source: "cloudflare-access",
      };
    }
  }

  const cloudflareEmail =
    headers.get("cf-access-authenticated-user-email") ||
    headers.get("cf-access-authenticated-user-id");

  if (cloudflareEmail && process.env.NODE_ENV !== "production") {
    return {
      email: cloudflareEmail,
      role: resolveAdminRole(cloudflareEmail),
      source: "cloudflare-access",
    };
  }

  if (process.env.ADMIN_AUTH_DISABLED === "true" && process.env.NODE_ENV !== "production") {
    const email = process.env.ADMIN_DEV_EMAIL ?? "admin@alpinebloom.local";

    return {
      email,
      role: resolveAdminRole(email),
      source: "disabled",
    };
  }

  const sessionIdentity = await getAdminIdentityFromSessionCookie(headers);
  if (sessionIdentity) return sessionIdentity;

  if (process.env.NODE_ENV !== "production") {
    const email = process.env.ADMIN_DEV_EMAIL ?? "local-admin@alpinebloom.dev";

    return {
      email,
      role: resolveAdminRole(email),
      source: "local-dev",
    };
  }

  return null;
}

export async function requireAdminIdentity(headers: Headers) {
  return getAdminIdentityFromHeaders(headers);
}
