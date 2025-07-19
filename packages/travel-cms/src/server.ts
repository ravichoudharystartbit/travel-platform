import express from 'express';
import payload from 'payload';
import { config } from 'dotenv';

// Load environment variables
config({
  path: '../../../.env',
});

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    // Initialize Payload CMS
    await payload.init({
      secret: process.env.PAYLOAD_SECRET || 'dev-secret',
      express: app,
      onInit: async () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      },
    });

    // Add your own express routes here
    app.get('/', (_, res) => {
      res.redirect('/admin');
    });

    app.listen(PORT, () => {
      payload.logger.info(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
