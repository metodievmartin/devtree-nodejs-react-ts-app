import colors from 'colors';
import { createServer } from 'node:http';

import app from './app';
import config from './config/app.config';
import { connectDB } from './services/db.service';

/**
 * Initialise the server and database connection
 */
async function startServer() {
  // Connect to the database first
  await connectDB(config.db.url);

  // Create and start HTTP server
  const server = createServer(app);

  server.listen(config.server.port, () => {
    console.log(
      colors.cyan.bold(
        `Server is running in ${config.env} on port ${config.server.port}...`
      )
    );
  });

  return server;
}

startServer();
