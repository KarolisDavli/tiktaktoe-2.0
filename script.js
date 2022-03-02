var Gameboard = (function() {
  let gameOn = false;
  board = ['x', 'x', 'x', 'o', 'o', 'o', 'x', 'x', 'x',];
  const content = document.querySelector('.content');
  const gameBoard = document.createElement('div')
  gameBoard.classList.add('game-board');
  const start = document.querySelector('#start');



  const gameInit = () => {
    if (gameOn) {
      alert('Game already started');
    } else {
      gameOn = true;
      board.forEach(square => {
        square = document.createElement('div')
        square.classList.add('square');
        gameBoard.append(square);
      });
    }
    content.append(gameBoard);
  }

  start.addEventListener('click', gameInit)

  const addPlayer = (name) => {
    console.log(`Hello ${name}`);
    _shitsPrivate(name);
  }

  const _shitsPrivate = (priv) => {
    console.log(`This shit is private. Called by ${priv}`);
  }

  const newPlayer = (name) => {
    let score = 0;
    const takeTurn = () => {
      console.log(`Player ${name} made a move`);
      score++;
      console.log(score);
    }
  
    return {
      takeTurn,
    }
  }

  return {
    addPlayer,
    newPlayer,
  }
})()


const tom = Gameboard.newPlayer('tom');
tom.takeTurn();
const mary = Gameboard.newPlayer('mary');

