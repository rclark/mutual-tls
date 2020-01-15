const https = require('https');
const fs = require('fs');
const path = require('path');

const server_private = fs.readFileSync(path.join(__dirname, '..', 'server.key'));
const server_public = fs.readFileSync(path.join(__dirname, '..', 'server.crt'));
const client_public = fs.readFileSync(path.join(__dirname, '..', 'client.crt'));

const server = https.createServer({
  key: server_private,
  cert: server_public,
  ca: [client_public],
  requestCert: true,
  rejectUnauthorized: true
}, (req, res) => {
  res.writeHead(200);
  res.end();
});

server.listen(8000);
