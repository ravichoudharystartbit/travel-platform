// Simple test API to verify serverless functions work
module.exports = (req, res) => {
    res.status(200).json({ 
      message: 'API is working!',
      timestamp: new Date().toISOString(),
      env: {
        DATABASE_URI: process.env.DATABASE_URI ? 'Set' : 'Not set',
        PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ? 'Set' : 'Not set',
        NODE_ENV: process.env.NODE_ENV
      }
    });
  };