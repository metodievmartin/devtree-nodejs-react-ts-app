import { createServer } from 'node:http';

import app from './app';
import config from './config/app.config';

const server = createServer(app);

server.listen(config.server.port, () => {
  console.log(
    `'Server is running in ${config.env} on port ${config.server.port}...`
  );
});
