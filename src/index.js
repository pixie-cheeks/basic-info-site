import { createServer } from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

const pathnameToFilename = (urlPathName) => {
  const filenameObj = { status: 200, filename: './index.html' };
  if (urlPathName === '/') return filenameObj;

  const isFileInStore = ['about', 'contact-me'].some(
    (name) => `/${name}` === urlPathName,
  );
  if (isFileInStore)
    return { ...filenameObj, filename: `./${urlPathName}.html` };

  return { status: 404, filename: './404.html' };
};

const port = 8_080;
const hostname = 'localhost';
const serverHome = `http://${hostname}:${port}`;

const server = createServer(async (req, res) => {
  const { pathname } = new URL(`${serverHome}${req.url}`);
  const { status, filename } = pathnameToFilename(pathname);
  res.setHeader('content-type', 'text/html');

  try {
    const fileContent = await fs.readFile(
      path.resolve(import.meta.dirname, filename),
    );
    res.statusCode = status;
    res.end(fileContent);
  } catch (error) {
    console.error(error);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server started at ${serverHome}`);
});
