import path from 'path';
import express from 'express';
import { mainHandler } from './mainHandler.js';

function main(params) {
  const app = express();

  const __dirname = path.resolve();

  app.use(express.static(`${__dirname}/client`));

  app.get('/', mainHandler);
  app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
  });
  app.get('/pictures/:pictureName', (req, res) => {
    const pictureName = req.params.pictureName;
    res.sendFile(__dirname + '/client/');
  });
  app.get('/calculator/:calcString');

  app.listen(3000);
}

main();
