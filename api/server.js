const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// CORS Configuration
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Pre-flight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Use default middlewares (cors, static, etc)
server.use(middlewares);

// Use router
server.use(router);

// Error handling
server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: true,
    message: err.message || 'Internal Server Error'
  });
});

module.exports = server;