import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { searchChannels, getChannelDetails } from './api/youtube.client.js';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.get('/api/search', (req, res) => {
  const query = req.query['q'] as string;

  if(!query) {
    res.status(400).send('Missing query parameter');
    return;
  }
  
  searchChannels(query || '')
    .then((channels) => {
      res.json(channels);
    })
    .catch((error) => { 
      console.log(error);
      res.status(500).send('Error while searching');
    });
});

app.get('/api/channel', (req, res) => {
  const channel = req.query['id'] as string;

  if(!channel) {
    res.status(400).send('Missing channel id parameter');
    return;
  }
  
  getChannelDetails(channel)
    .then((details) => {
      res.json(details);
    })
    .catch((error) => { 
      console.log(error);
      res.status(500).send('Error while searching');
    });
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
