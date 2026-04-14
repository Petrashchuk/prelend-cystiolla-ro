'use strict';
const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT) || 4000;
const ROOT = path.resolve(__dirname, '../public');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.webp': 'image/webp',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
};

const CACHE = {
  '.html': 'no-cache, must-revalidate',
  '.css':  'public, max-age=86400',
  '.js':   'public, max-age=86400',
  '.png':  'public, max-age=2592000',
  '.jpg':  'public, max-age=2592000',
  '.webp': 'public, max-age=2592000',
  '.woff2':'public, max-age=31536000, immutable',
};

http.createServer((req, res) => {
  const url      = req.url.split('?')[0];
  const filePath = path.join(ROOT, url === '/' ? 'index.html' : url);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end();
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Not found');
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type':           MIME[ext] || 'application/octet-stream',
      'Cache-Control':          CACHE[ext] || 'no-cache',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options':        'SAMEORIGIN',
      'Referrer-Policy':        'strict-origin-when-cross-origin',
    });
    res.end(data);
  });
}).listen(PORT, () => console.log(`Prelander on :${PORT}`));
