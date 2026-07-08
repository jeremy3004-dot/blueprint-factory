export type ProtectedPreviewResult =
  | { protected: true; code: "PREVIEW_PROTECTED"; detail: string }
  | { protected: false; code: null; detail: string };

export function protectedPreviewMessage(): string {
  return "PREVIEW_PROTECTED: owner must disable Vercel Deployment Protection";
}

export function detectProtectedPreview(url: string, status: number, html: string): ProtectedPreviewResult {
  const isHosted = /^https:\/\/[^/]+\.vercel\.app/i.test(url) || /vercel/i.test(html);
  const protectedByStatus = isHosted && (status === 401 || status === 403);
  const protectedByHtml =
    isHosted &&
    /deployment protection|authentication required|continue with github|vercel login|sign in to continue/i.test(html);

  if (protectedByStatus || protectedByHtml) {
    return { protected: true, code: "PREVIEW_PROTECTED", detail: protectedPreviewMessage() };
  }
  return { protected: false, code: null, detail: "preview appears public" };
}

export async function checkProtectedPreview(url: string): Promise<ProtectedPreviewResult> {
  if (!/^https?:\/\//.test(url)) return { protected: false, code: null, detail: "not an http preview URL" };
  try {
    const response = await fetch(url, { method: "GET" });
    const html = await response.text();
    return detectProtectedPreview(url, response.status, html.slice(0, 20000));
  } catch {
    return { protected: false, code: null, detail: "preview could not be fetched for protection check" };
  }
}
