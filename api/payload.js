// Vercel serverless function for Payload CMS
const express = require('express');
const payload = require('payload');

const app = express();

let isInitialized = false;

const start = async () => {
  if (!isInitialized) {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      express: app,
      onInit: () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
        isInitialized = true;
      },
    });
  }
  
  return app;
};

module.exports = start;