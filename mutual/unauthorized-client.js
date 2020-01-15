const https = require('https');
const fs = require('fs');
const path = require('path');

const server_public = fs.readFileSync(path.join(__dirname, '..', 'server.crt'));

const agent = new https.Agent({
  ca: [server_public]
});

const req = https.request({
  method: 'GET',
  host: 'localhost',
  port: 8000,
  agent
}, (res) => {
  console.log(res.statusCode);
});

req.once('error', (err) => {
  console.log('request error');
  console.log(err);
});

req.end();
