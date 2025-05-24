import fs from 'node:fs/promises';
import path from 'node:path';
import express from 'express';

const app = express();
const port = 3_000;
const hostname = 'localhost';
const serverHome = `http://${hostname}:${port}`;

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

app.get(/^\/.*/, async (req, res) => {
  const { status, filename } = pathnameToFilename(req.path);
  try {
    const fileContent = await fs.readFile(
      path.resolve(import.meta.dirname, filename),
    );
    res.type('html');
    res.status(status);
    res.send(fileContent);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send('The server has encountered an error.');
  }
});

app.listen(port, () => {
  console.log(`Server started at ${serverHome}`);
});
