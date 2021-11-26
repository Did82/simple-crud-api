require('dotenv').config();
const http = require('http');
const InMemoryDB = require('./db');

const db = new InMemoryDB();

const { stdout } = process;

const PORT = process.env.PORT || 5000;
const { HOST } = process.env;

const server = http.createServer((req, res) => {
  const urlParse = req.url;
  const id = urlParse.split('/').pop();

  if (urlParse === '/person' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(db.findMany());
  }
  // if (id && req.method === 'GET') {
  //   res.writeHead(200, { 'Content-Type': 'application/json' });
  //   // console.log(id);
  //   res.end(JSON.stringify(id));
  // }
  if (urlParse.pathname === '/person' && req.method === 'POST') {
    // TODO: POST logic
  }
  if (urlParse.pathname === '/person/tasks' && req.method === 'POST') {
    // TODO: POST logic
  }
  if (urlParse.pathname === '/person' && req.method === 'PUT') {
    // TODO: PUT logic
  }
  if (urlParse.pathname === '/person' && req.method === 'DELETE') {
    // TODO: DELETE logic
  }
});

server.listen(PORT, HOST, () => {
  stdout.write(`Server running at http://${HOST}:${PORT}/\n`);
});
