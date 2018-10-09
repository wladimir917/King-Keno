const express = require('express');
const fs = require('fs');

const server = express();
const port = 5000;

//Middleware Body Parser
server.use(express.json());

server.get('/', (req, res) => {
  res.send('<h1>Keno King Api,</h1>');
});

server.get('/htmls', (req, res) => {
  fs.readFile('index.html', 'utf8', (err, contents) => {
    if(err) {
      throw err;
    }
    res.json(contents);
  });
})

server.get('/play', (req, res) => {
  const game = {
    total: 1000,
    balls: [67,76,12,1,10,43,24,65,64,73,45,38,19,93]
  };

  res.status(200).json(game);
});

const tasks = [];

server.post('/task', (req, res) => {
  const { task } = req.body;
  if(!task) {
    res.status(422);
    res.json( {error: 'Must provide a task'})
    return;
  }
  tasks.push(task);
  res.json({ tasks });
});

server.listen(port, () => console.log(`Server running on port ${port}`));