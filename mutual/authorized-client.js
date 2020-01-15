const https = require('https');
const fs = require('fs');
const path = require('path');

const server_public = fs.readFileSync(path.join(__dirname, '..', 'server.crt'));

const client_private = fs.readFileSync(path.join(__dirname, '..', 'client.key'));
const client_public = fs.readFileSync(path.join(__dirname, '..', 'client.crt'));

const agent = new https.Agent({
  ca: [server_public]
});

const req = https.request({
  method: 'GET',
  host: 'localhost',
  port: 8000,
  agent,
  cert: client_public,
  key: client_private
}, (res) => {
  console.log(res.statusCode);
});

req.once('error', (err) => {
  console.log('request error');
  console.log(err);
});

req.end();
