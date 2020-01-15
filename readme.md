# mutual-tls

Note that since I'm dealing here with self-signed certificates, the clients involve a configuration step that wouldn't be needed in a production system.

- Node.js clients require an `https.Agent` designed to accept the self-signed certificate.
- curl commands require a `--cacert` flag indicating which self-signed certificates are acceptable.

## What you're used to

Servers present certificates that confirm that they are who they say they are. Clients can be confident they're interacting with the server they intended to.

To connect to the server that **does not demand a client certificate**:

```sh
# Start the server
node server-only/server.js

# In a different shell, you can connect to it via node.js or curl
node server-only/client.js
curl -v --cacert ./server.crt https://localhost:8000
```

## Mutual TLS

As before, the servers still must confirm their identity by presenting a certificate. However in this case the server also demands that the client present a certificate that confirms the client's identity. The server is configured to allow connections only from clients who present a certificate that the server is designed to accept.

To connect to the server that **demands a client certificate**:

```sh
# Start the server
node mutual/service.js

# In a different shell, test various connections.

# This node.js script and curl command fail because they do not present a client cert
node mutual/unauthorized-client.js
curl -v --cacert ./server.crt https://localhost:8000

# These succeed by presenting a client cert
node mutual/authorized-client.js
curl -v --cacert ./server.crt --cert ./client.pem https://localhost:8000
```



