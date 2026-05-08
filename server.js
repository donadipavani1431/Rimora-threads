const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const data = require('./data/content');

const PORT = process.env.PORT || 5050;
const FRONTEND_DIR = path.resolve(__dirname, '..', 'frontend');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
};

const sendFile = (res, filePath) => {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      sendJson(res, 500, { message: 'Unable to read file.' });
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[extension] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
};

const serveFrontendFile = (res, pathname) => {
  const normalizedPath = pathname === '/' ? '/index.html' : pathname;
  const candidatePath = path.normalize(path.join(FRONTEND_DIR, normalizedPath));

  if (!candidatePath.startsWith(FRONTEND_DIR)) {
    sendJson(res, 403, { message: 'Forbidden path.' });
    return;
  }

  fs.stat(candidatePath, (error, stats) => {
    if (error || !stats.isFile()) {
      sendFile(res, path.join(FRONTEND_DIR, 'index.html'));
      return;
    }

    sendFile(res, candidatePath);
  });
};

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'GET' && requestUrl.pathname === '/api/health') {
    sendJson(res, 200, { status: 'ok', service: 'Rimora Threads API' });
    return;
  }

  if (req.method === 'GET' && requestUrl.pathname === '/api/content') {
    sendJson(res, 200, data);
    return;
  }

  if (req.method === 'GET' && requestUrl.pathname === '/api/products') {
    const category = requestUrl.searchParams.get('category');
    if (!category) {
      sendJson(res, 200, data.products);
      return;
    }

    const filtered = data.products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
    sendJson(res, 200, filtered);
    return;
  }

  if (req.method === 'POST' && requestUrl.pathname === '/api/newsletter') {
    let rawBody = '';
    req.on('data', (chunk) => {
      rawBody += chunk;
    });

    req.on('end', () => {
      try {
        const body = JSON.parse(rawBody || '{}');
        const email = body.email;

        if (!email || !email.includes('@')) {
          sendJson(res, 400, { message: 'Please provide a valid email address.' });
          return;
        }

        sendJson(res, 201, {
          message: `Thanks for subscribing to ${data.brand.name}!`,
          email
        });
      } catch {
        sendJson(res, 400, { message: 'Invalid JSON body.' });
      }
    });
    return;
  }

  if (req.method === 'GET') {
    serveFrontendFile(res, requestUrl.pathname);
    return;
  }

  sendJson(res, 404, { message: 'Route not found' });
});

server.listen(PORT, () => {
  console.log(`Rimora Threads app running on http://localhost:${PORT}`);
});
