const TO_EMAIL = "info@zykken.com";
const FROM_EMAIL = "Zykken Website <website@zykken.com>";
const NEEDS = {
  automation: "AI automation & workflows",
  website: "Premium website",
  voice: "Voice / WhatsApp agent",
  software: "Custom software / SaaS",
  crm: "CRM, funnels & nurture"
};

function field(value, maxLength) {
  return typeof value === "string" && value.length <= maxLength ? value.trim() : null;
}

function respond(res, status, body, asHtml) {
  if (asHtml) {
    res.status(status);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    const title = body.ok ? "Request sent" : "Unable to send";
    const message = body.ok
      ? "Thanks — your request was sent. We'll reply soon."
      : "We couldn't send your request. Please email info@zykken.com instead.";
    const mailLink = body.ok ? "" : '<p><a href="mailto:info@zykken.com">Email info@zykken.com</a></p>';
    return res.end('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + title + ' — Zykken</title><style>body{background:#090909;color:#f5f5f5;font:16px/1.6 system-ui;margin:0;min-height:100vh;display:grid;place-items:center}main{max-width:34rem;padding:2rem}a{color:#fff}</style><main><h1>' + title + '</h1><p>' + message + '</p>' + mailLink + '<p><a href="/">Back to Zykken</a></p></main></html>');
  }
  return res.status(status).json(body);
}

module.exports = async function contact(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const contentType = (req.headers["content-type"] || "").split(";")[0].trim().toLowerCase();
  const asHtml = contentType === "application/x-www-form-urlencoded";
  const reply = (status, body) => respond(res, status, body, asHtml);

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return reply(405, { ok: false, error: "Method not allowed." });
  }

  if (contentType !== "application/json" && !asHtml) {
    return reply(415, { ok: false, error: "Unsupported form format." });
  }

  if (Number(req.headers["content-length"] || 0) > 8192) {
    return reply(413, { ok: false, error: "Your request is too long." });
  }

  let body;
  try {
    body = typeof req.body === "string"
      ? asHtml ? Object.fromEntries(new URLSearchParams(req.body)) : JSON.parse(req.body)
      : req.body;
  } catch (_) {
    return reply(400, { ok: false, error: "Invalid form data." });
  }

  if (!body || typeof body !== "object" || Array.isArray(body) || JSON.stringify(body).length > 8192) {
    return reply(400, { ok: false, error: "Invalid form data." });
  }

  // The hidden field catches basic form bots without exposing the mail service.
  if (body.company_site) return reply(200, { ok: true });

  const name = field(body.name, 120);
  const email = field(body.email, 254);
  const phone = field(body.phone == null ? "" : body.phone, 40);
  const need = field(body.need, 40);
  const message = field(body.message == null ? "" : body.message, 1200);

  if (!name || name.length < 2 || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ||
      phone === null || (phone && phone.replace(/\D/g, "").length < 7) ||
      !Object.hasOwn(NEEDS, need) || message === null) {
    return reply(400, { ok: false, error: "Please check the form and try again." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form email is not configured.");
    return reply(503, { ok: false, error: "The contact form is temporarily unavailable. Please email info@zykken.com." });
  }

  const lines = [
    "New Zykken website inquiry",
    "Name: " + name,
    "Email: " + email,
    "Phone: " + (phone || "Not provided"),
    "Interested in: " + NEEDS[need],
    "Message:",
    message || "No additional details provided"
  ];

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: "New website inquiry — " + NEEDS[need],
        text: lines.join("\n")
      }),
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      console.error("Contact email provider rejected the request:", response.status);
      return reply(502, { ok: false, error: "We couldn't send your request. Please email info@zykken.com." });
    }

    const result = await response.json();
    if (!result || !result.id) {
      console.error("Contact email provider returned no message ID.");
      return reply(502, { ok: false, error: "We couldn't confirm your request. Please email info@zykken.com." });
    }

    return reply(200, { ok: true });
  } catch (error) {
    console.error("Contact email request failed:", error && error.name);
    return reply(502, { ok: false, error: "We couldn't send your request. Please email info@zykken.com." });
  }
};
