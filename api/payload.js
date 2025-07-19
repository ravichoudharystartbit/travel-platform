// Vercel serverless function for Payload CMS
const payload = require('payload');

module.exports = async (req, res) => {
  // Initialize Payload if not already done
  if (!payload.isInitialized) {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      mongoURL: process.env.DATABASE_URI,
      express: false, // Important for serverless
      onInit: () => {
        console.log('Payload initialized successfully');
      },
    });
  }

  // Get the handler from Payload
  const handler = await payload.getRequestHandler();
  return handler(req, res);
};