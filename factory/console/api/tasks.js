function checkAuth(req) {
  const password = process.env.CONSOLE_PASSWORD;
  if (!password) return true;
  const header = req.headers.authorization || req.headers.get?.("authorization") || "";
  const expected = "Basic " + Buffer.from(`owner:${password}`).toString("base64");
  return header === expected;
}

export default function handler(req, res) {
  if (!checkAuth(req)) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Blueprint Factory Console"');
    return res.status(401).end("Authentication required");
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.status(501).json({
    error: "Task creation is only available on your local console.",
    hint: "Run pnpm blueprint:console:install and use http://blueprint.local:4177"
  });
}
