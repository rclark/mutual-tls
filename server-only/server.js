const https = require('https');
const fs = require('fs');
const path = require('path');

const server_private = fs.readFileSync(path.join(__dirname, '..', 'server.key'));
const server_public = fs.readFileSync(path.join(__dirname, '..', 'server.crt'));

const server = https.createServer({
  key: server_private,
  cert: server_public
}, (req, res) => {
  res.writeHead(200);
  res.end();
});

server.listen(8000);
