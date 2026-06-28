export function payloadConfigured() {
  return Boolean(process.env.DATABASE_URI && process.env.PAYLOAD_SECRET);
}

export function payloadUnavailableResponse() {
  return Response.json(
    {
      ok: false,
      message: "Payload CMS is not configured. Set DATABASE_URI and PAYLOAD_SECRET.",
    },
    { status: 503 },
  );
}
