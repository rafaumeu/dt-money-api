const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Middleware para configurar CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir todos os domínios (ajuste para seu caso de uso)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Incluindo o cabeçalho de autorização, caso necessário
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Responde para requisições OPTIONS
  }
  
  next();
});


// Usar middlewares padrão do JSON Server
server.use(middlewares);

// Usar o rewriter para ajustar rotas
server.use(jsonServer.rewriter({
  '/api/*': '/$1', // "/api/resource" vira "/resource"
  '/blog/:resource/:id/show': '/:resource/:id'
}));

// Usar o roteador do JSON Server
server.use(router);

// Iniciar o servidor
server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});
