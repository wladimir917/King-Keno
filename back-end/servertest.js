const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const server = express();

const person = {
  name: 'Jeff',
  age: 30
}


// //Middleware
// const logger = (req, res, next) => {
//   console.log('Logging...');
//   next();
// }

// server.use(logger);

// Body parser Middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
server.use(express.static(path.join(__dirname, 'public')));

server.get('/', (req, res) => {
  res.send('Hello');
});

server.listen(8080, () => {
  console.log('Server Started on port 8080');
})