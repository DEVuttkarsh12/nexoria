// Dependency-free local preview for the static site and its Vercel contact function.
const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const contact = require("../api/contact.js");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4174);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8"
};

http.createServer(async (req, res) => {
  const pathname = new URL(req.url, "http://localhost").pathname;

  if (pathname === "/api/contact") {
    const chunks = [];
    let size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > 8192) {
        res.writeHead(413, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: "Your request is too long." }));
        return;
      }
      chunks.push(chunk);
    }
    req.body = Buffer.concat(chunks).toString("utf8");
    res.status = function (code) { this.statusCode = code; return this; };
    res.json = function (value) {
      this.setHeader("Content-Type", "application/json; charset=utf-8");
      this.end(JSON.stringify(value));
      return this;
    };
    return contact(req, res);
  }

  const relative = pathname === "/" ? "index.html" : decodeURIComponent(pathname).replace(/^\/+/, "");
  const fullPath = path.resolve(root, relative);
  const type = types[path.extname(fullPath)];
  if (!type || !fullPath.startsWith(root + path.sep) || relative.split("/").some(part => part.startsWith("."))) {
    res.writeHead(404).end("Not found");
    return;
  }
  try {
    const contents = await fs.readFile(fullPath);
    res.writeHead(200, { "Content-Type": type });
    res.end(contents);
  } catch (_) {
    res.writeHead(404).end("Not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Local preview: http://127.0.0.1:${port}/`);
});
