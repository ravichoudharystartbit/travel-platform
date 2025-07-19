import express from 'express';
import { getPayload } from 'payload';
import { config } from 'dotenv';
import { seed } from './seed';

// Load environment variables
config({
  path: '../../../.env',
});

const app = express();
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    // Initialize Payload
    const payload = await getPayload({
      express: app,
      onInit: async (payload) => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      },
    });

    // Add your own express routes here
    app.get('/', (_, res) => {
      res.redirect('/admin');
    });

    // Seed database with initial data if needed
    if (process.env.PAYLOAD_SEED === 'true') {
      await seed(payload);
      process.exit();
    }

    app.listen(PORT, () => {
      payload.logger.info(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
