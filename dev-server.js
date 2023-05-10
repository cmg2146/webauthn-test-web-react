const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const path = require("path");
const createProxyMiddleware = require("http-proxy-middleware");

const dev = process.env.NODE_ENV === "development";
const app = next({ dev, dir: path.resolve(__dirname) });
const handle = app.getRequestHandler();

/**
 * Use HTTPS in development (WebAuthn requires it)
 */
const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, 'dev-server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, 'dev-server.pem'))
};

/**
 * Proxy API requests to the API server in development
 */
const apiProxy = createProxyMiddleware('/api/', {
  changeOrigin: false,
  target: process.env.API_URL,
  pathRewrite: {
    '^/api/': ''
  }
});

app.prepare().then(() => {
  var port = parseInt(process.env.PORT || '3000');
  var server = createServer(
    httpsOptions,
    (req, res) => processRequest(req, res, parse(req.url, true))
  );

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`> Server started on https://localhost:${port}`);
  });
});

const processRequest = function(req, res, parsedUrl) {
  apiProxy(req, res, function(err) {
    if (err) {
      throw err;
    }
    handle(req, res, parsedUrl);
  });
};
