const test = require("node:test");
const assert = require("node:assert/strict");
const contact = require("../api/contact.js");

const valid = {
  name: "Test Visitor",
  email: "visitor@example.com",
  phone: "+1 555 123 4567",
  need: "automation",
  message: "Please help with lead follow-up.",
  company_site: ""
};

async function invoke(body = valid, overrides = {}) {
  const res = {
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(value) { this.body = value; return this; },
    end(value) { this.html = value; return this; }
  };
  await contact({ method: "POST", headers: { "content-type": "application/json" }, body, ...overrides }, res);
  return res;
}

test("sends a validated inquiry only to the confirmed mailbox", async () => {
  const oldKey = process.env.RESEND_API_KEY;
  const oldFrom = process.env.RESEND_FROM_EMAIL;
  const oldFetch = global.fetch;
  process.env.RESEND_API_KEY = "test-key";
  process.env.RESEND_FROM_EMAIL = "Zykken Website <website@zykken.com>";
  let request;
  global.fetch = async (url, options) => {
    request = { url, options };
    return { ok: true, json: async () => ({ id: "test-message-id" }) };
  };
  try {
    const response = await invoke(valid);
    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body, { ok: true });
    assert.equal(request.url, "https://api.resend.com/emails");
    assert.equal(request.options.headers.Authorization, "Bearer test-key");
    const sent = JSON.parse(request.options.body);
    assert.deepEqual(sent.to, ["info@zykken.com"]);
    assert.equal(sent.reply_to, valid.email);
    assert.equal(sent.from, "Zykken Website <website@zykken.com>");
    assert.match(sent.text, /Please help with lead follow-up/);
  } finally {
    global.fetch = oldFetch;
    if (oldKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = oldKey;
    if (oldFrom === undefined) delete process.env.RESEND_FROM_EMAIL;
    else process.env.RESEND_FROM_EMAIL = oldFrom;
  }
});

test("rejects bad fields before contacting the provider", async () => {
  const oldFetch = global.fetch;
  global.fetch = () => { throw new Error("Provider must not be called"); };
  try {
    for (const body of [
      { ...valid, name: "X" },
      { ...valid, email: "not-an-email" },
      { ...valid, phone: "123" },
      { ...valid, need: "unsupported" },
      { ...valid, message: "x".repeat(1201) }
    ]) {
      const response = await invoke(body);
      assert.equal(response.statusCode, 400);
      assert.equal(response.body.ok, false);
    }
  } finally { global.fetch = oldFetch; }
});

test("honeypot submissions do not send email", async () => {
  const oldFetch = global.fetch;
  global.fetch = () => { throw new Error("Provider must not be called"); };
  try {
    const response = await invoke({ ...valid, company_site: "spam.example" });
    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body, { ok: true });
  } finally { global.fetch = oldFetch; }
});

test("missing credentials and provider failures never report success", async () => {
  const oldKey = process.env.RESEND_API_KEY;
  const oldFetch = global.fetch;
  delete process.env.RESEND_API_KEY;
  try {
    const unavailable = await invoke(valid);
    assert.equal(unavailable.statusCode, 503);
    assert.equal(unavailable.body.ok, false);

    process.env.RESEND_API_KEY = "test-key";
    global.fetch = async () => ({ ok: false, status: 403 });
    const rejected = await invoke(valid);
    assert.equal(rejected.statusCode, 502);
    assert.equal(rejected.body.ok, false);
  } finally {
    global.fetch = oldFetch;
    if (oldKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = oldKey;
  }
});

test("only accepts JSON POST requests", async () => {
  assert.equal((await invoke(valid, { method: "GET" })).statusCode, 405);
  assert.equal((await invoke(valid, { headers: { "content-type": "text/plain" } })).statusCode, 415);
  assert.equal((await invoke(valid, { body: "{" })).statusCode, 400);
});

test("a no-JavaScript form post gets a readable error page", async () => {
  const oldKey = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  try {
    const response = await invoke(new URLSearchParams(valid).toString(), {
      headers: { "content-type": "application/x-www-form-urlencoded" }
    });
    assert.equal(response.statusCode, 503);
    assert.match(response.html, /Unable to send/);
    assert.match(response.html, /mailto:info@zykken.com/);
  } finally {
    if (oldKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = oldKey;
  }
});
