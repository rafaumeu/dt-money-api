const jsonServer = require('json-server');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Configuração do CORS
server.use(cors({
  origin: ['http://localhost:4000', 'http://localhost:3000'],  // Adicione aqui outros domínios permitidos
  methods: ['GET', 'POST', 'PUT', PATCH, 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true
}));

// Middleware para logging de requisições (opcional, mas útil para debug)
server.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Configuração do proxy para a API do Vercel
server.use('/api', createProxyMiddleware({
  target: 'https://dt-money-api-abs5-ffygew4wn-rafaels-projects-62f31870.vercel.app',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''  // Remove o prefixo '/api' ao encaminhar a requisição
  },
  onProxyRes: function (proxyRes, req, res) {
    // Adiciona headers de CORS na resposta do proxy
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,HEAD,PUT,PATCH,POST,DELETE';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
  },
  onError: (err, req, res) => {
    console.error('Proxy Error:', err);
    res.status(500).json({ error: 'Proxy Error', message: err.message });
  }
}));

// Usar middlewares padrão do JSON Server
server.use(middlewares);

// Usar o rewriter para ajustar rotas
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/blog/:resource/:id/show': '/:resource/:id'
}));

// Middleware para manipular erros
server.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Usar o roteador do JSON Server
server.use(router);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
  console.log(`Proxy configured for Vercel API`);
});