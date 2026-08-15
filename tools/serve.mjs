/* tools/serve.mjs — dev-only static server that mimics vercel.json.
 *
 * Reproduces just enough of Vercel's `cleanUrls: true, trailingSlash: false`
 * behaviour that `smoke-test.mjs` can drive an http:// lane locally the same
 * way it drives file://. Not the product — never loaded by a page.
 *
 *   node tools/serve.mjs [port]              # stand-alone, for manual testing
 *   import { startServer } from "./serve.mjs" # used by smoke-test.mjs
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon"
};

function typeFor(file) {
  return TYPES[path.extname(file)] || "application/octet-stream";
}

/* Everything vercel.json excludes from the deploy via .vercelignore should
 * not be servable here either — dev tooling and the design contract are not
 * part of the hosted product. */
const IGNORED = ["spec", "tools", ".claude", ".git", ".screenshots"];

function isIgnored(rel) {
  const first = rel.split(path.sep)[0];
  return IGNORED.includes(first);
}

function send(res, status, file, extraHeaders) {
  res.writeHead(status, { "Content-Type": typeFor(file), ...extraHeaders });
  fs.createReadStream(file).pipe(res);
}

function startServer(port = 0) {
  const server = http.createServer((req, res) => {
    let reqPath = decodeURIComponent(req.url.split("?")[0]);

    if (reqPath !== "/" && reqPath.endsWith("/")) {
      res.writeHead(308, { Location: reqPath.replace(/\/+$/, "") });
      res.end();
      return;
    }

    if (reqPath === "/") reqPath = "/index.html";

    const rel = reqPath.slice(1);
    if (isIgnored(rel)) {
      send404();
      return;
    }

    const direct = path.join(root, rel);

    /* trailingSlash:false + cleanUrls:true — a request to the literal
     * "*.html" URL redirects to the extensionless canonical form. */
    if (direct.endsWith(".html") && fs.existsSync(direct) && reqPath !== "/index.html") {
      res.writeHead(308, { Location: reqPath.slice(0, -".html".length) });
      res.end();
      return;
    }

    if (fs.existsSync(direct) && fs.statSync(direct).isFile()) {
      send(res, 200, direct);
      return;
    }

    /* cleanUrls:true — "/lessons/lesson-02" serves lessons/lesson-02.html
     * with no redirect. */
    const withHtml = direct + ".html";
    if (fs.existsSync(withHtml) && fs.statSync(withHtml).isFile()) {
      send(res, 200, withHtml);
      return;
    }

    send404();

    function send404() {
      const notFound = path.join(root, "404.html");
      if (fs.existsSync(notFound)) send(res, 404, notFound);
      else { res.writeHead(404); res.end("404"); }
    }
  });

  return new Promise((resolve) => {
    server.listen(port, "127.0.0.1", () => {
      const actualPort = server.address().port;
      resolve({
        server,
        url: `http://127.0.0.1:${actualPort}`,
        close: () => new Promise((r) => server.close(r))
      });
    });
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = parseInt(process.argv[2], 10) || 8787;
  const { url } = await startServer(port);
  console.log("serving " + root + " at " + url);
}

export { startServer };
