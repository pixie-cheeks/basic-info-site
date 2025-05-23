import { createServer } from 'node:http';

const server = createServer((_req, res) => {
  res.setHeader('content-type', 'text/html');
  res.statusCode = 200;
  res.end('Hello World!');
});

const port = 8_000;
const hostname = 'localhost';
server.listen(port, hostname, () => {
  console.log(`Server started at http://${hostname}:${port}`);
});
