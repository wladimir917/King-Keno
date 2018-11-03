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
    balls: getNumbers(20,80)
  };

  res.status(200).json(game);
});

function isEqual(a1, a2) {
  let i = a1.length;
  if (i != a2.length) return false;
  while (i--) {
      if (a1[i] !== a2[i]) return false;
  }
  return true;
}

function getNumbers(set, maxNumber){
  let allNumbers = [];
  let ballsNumber = [];

  //Create the grid numbers 1-70
  for(let i = 1; i <= maxNumber ; i++)
  {
    allNumbers.push(false);
  }
  
	for(let i = 1; i <= set ; i++){
		let index = Math.floor(Math.random() * 70) + 1;
		if(allNumbers[index-1] === false ){
			ballsNumber.push(index);
			allNumbers[index-1] = true;
		} else{
			i--;
		}
  }

  return ballsNumber.sort((a,b) => a-b)
  // return ballsNumber
}


server.get('/mega', (req, res) => {
  const mega = [5,28,62,65,70]
  let ballsNumber = [];
  let megaNumber = [];
  let counter = 0;
  let match = false;
  let tickets = [];

  do {
    ballsNumber = getNumbers(5,70);
    megaNumber = getNumbers(1,25);
    counter++;
    match = isEqual(mega,ballsNumber)
    if(match){
      console.log(ballsNumber + " " + counter);
      match = isEqual([5],megaNumber);
    }
    // tickets.push({ballsNumber, megaNumber, match, counter});
  }while( match === false && counter < 1000000)
  // console.log(match, counter)
  tickets.push({ballsNumber, megaNumber, match, counter});
  res.status(200).json(tickets);
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