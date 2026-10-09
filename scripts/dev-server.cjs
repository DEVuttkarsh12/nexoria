// Dependency-free local preview for pre-rendered pages and the preserved contact API.
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const contact = require('../api/contact.js');
const { root, loadSite, renderRoute, sitemapXml, robotsTxt } = require('./build.cjs');

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.ttf': 'font/ttf', '.mp4': 'video/mp4',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8'
};

function createServer() {
  return http.createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      res.setHeader('X-Content-Type-Options', 'nosniff');
      if (pathname === '/api/contact') {
        const chunks = [];
        let size = 0;
        for await (const chunk of req) {
          size += chunk.length;
          if (size > 8192) {
            res.writeHead(413, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ ok: false, error: 'Your request is too long.' }));
            return;
          }
          chunks.push(chunk);
        }
        req.body = Buffer.concat(chunks).toString('utf8');
        res.status = function (code) { this.statusCode = code; return this; };
        res.json = function (value) {
          this.setHeader('Content-Type', 'application/json; charset=utf-8');
          this.end(JSON.stringify(value));
          return this;
        };
        return await contact(req, res);
      }
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        res.writeHead(405, { Allow: 'GET, HEAD' });
        res.end('Method not allowed');
        return;
      }
      if (pathname === '/robots.txt' || pathname === '/sitemap.xml') {
        const body = pathname === '/robots.txt' ? robotsTxt : sitemapXml(await loadSite(true));
        res.writeHead(200, { 'Content-Type': types[path.extname(pathname)], 'Cache-Control': 'no-store' });
        res.end(req.method === 'HEAD' ? undefined : body);
        return;
      }
      const relative = pathname.replace(/^\/+/, '');
      const fullPath = path.resolve(root, relative);
      const type = types[path.extname(fullPath)];
      const protectedPaths = ['scripts', 'tests', 'docs', 'api', 'node_modules'];
      if ((relative && !fullPath.startsWith(root + path.sep)) || relative.split('/').some(part => part.startsWith('.')) || protectedPaths.includes(relative.split('/')[0])) {
        res.writeHead(404).end('Not found');
        return;
      }
      if (!path.extname(pathname) || pathname.endsWith('.html')) {
        const page = await renderRoute(pathname, await loadSite(true));
        res.writeHead(page.status, { 'Content-Type': types['.html'], 'Cache-Control': 'no-store' });
        res.end(req.method === 'HEAD' ? undefined : page.html);
        return;
      }
      if (!type) { res.writeHead(404).end('Not found'); return; }
      try {
        const contents = await fs.readFile(fullPath);
        res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
        res.end(req.method === 'HEAD' ? undefined : contents);
      } catch (error) {
        if (error.code !== 'ENOENT' && error.code !== 'EISDIR') throw error;
        res.writeHead(404).end('Not found');
      }
    } catch (error) {
      if (error instanceof URIError) { res.writeHead(400).end('Invalid URL'); return; }
      console.error('Preview error:', error.message);
      if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('The preview could not render this page. Check the terminal for details.');
    }
  });
}

module.exports = { createServer };
if (require.main === module) {
  const port = Number(process.env.PORT || 4180);
  const host = process.env.HOST || '127.0.0.1';
  createServer().listen(port, host, () => { console.log(`Zykken preview: http://${host}:${port}/`); });
}
