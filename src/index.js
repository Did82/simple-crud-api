// require('dotenv').config();
const http = require('http');
const { validate } = require('uuid');
const InMemoryDB = require('./db');
const isPersonValid = require('./helpers/personValidate');

const db = new InMemoryDB();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST_IP;

const server = http.createServer((req, res) => {
  // const req.url = req.url;
  const id = req.url.split('/').pop();

  if (req.url === '/person' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(db.findMany());
  } else if (req.url.match(/\/person\/([a-z0-9-]+)/) && req.method === 'GET') {
    if (validate(id)) {
      const pers = db.findOne(id);
      if (pers) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(pers));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Error: person with requested id: ${id} is not find` }));
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Error: id is not valid UUID' }));
    }
  } else if (req.url === '/person' && req.method === 'POST') {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      const body = JSON.parse(data);
      if (isPersonValid(body)) {
        const newPers = db.insertOne(body);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newPers));
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error: request body does not contain mandatory fields or they are not valid' }));
      }
    });
  } else if (req.url.match(/\/person\/([a-z0-9-]+)/) && req.method === 'PUT') {
    if (validate(id)) {
      const pers = db.findOne(id);
      if (pers) {
        let newData = '';
        req.on('data', (chunk) => {
          newData += chunk;
        });
        req.on('end', () => {
          const body = JSON.parse(newData);
          if (isPersonValid(body)) {
            const updatedPers = db.updateOne(pers, body);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedPers));
          } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error: request body does not contain mandatory fields or they are not valid' }));
          }
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Error: person with requested id: ${id} is not find` }));
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Error: id is not valid UUID' }));
    }
  } else if (req.url.match(/\/person\/([a-z0-9-]+)/) && req.method === 'DELETE') {
    if (validate(id)) {
      const pers = db.findOne(id);
      if (pers) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        db.deleteOne(pers);
        res.end(JSON.stringify({ message: `Person with requested id: ${id} was DELETED` }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Person with requested id: ${id} is not find` }));
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'id is not valid UUID' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error: endpoint not found' }));
  }
});

server.listen(PORT || 5000, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
