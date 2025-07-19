// Alternative Payload CMS serverless approach
const express = require('express');

let app;

module.exports = async (req, res) => {
  if (!app) {
    // Import your built server
    try {
      const serverModule = require('../packages/travel-cms/dist/server');
      app = typeof serverModule === 'function' ? serverModule() : serverModule.default || serverModule;
    } catch (error) {
      console.error('Failed to load server:', error);
      return res.status(500).json({ error: 'Failed to initialize server', details: error.message });
    }
  }

  // Handle the request
  if (app && typeof app === 'function') {
    return app(req, res);
  } else {
    return res.status(500).json({ error: 'Server not properly initialized' });
  }
};