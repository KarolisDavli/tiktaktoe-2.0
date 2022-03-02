var Gameboard = (function() {
  let gameOn = false;
  board = ['x', 'x', 'x', 'o', 'o', 'o', 'x', 'x', 'x',];
  const content = document.querySelector('.content');
  const gameBoard = document.createElement('div');
  gameBoard.classList.add('game-board');
  const start = document.querySelector('.start');



  const gameInit = () => {
    if (gameOn) {
      alert('Game already started');
    } else {
      gameOn = true;
      let i = 0;
      board.forEach(square => {
        square = document.createElement('div');
        square.setAttribute('data-index', i);
        square.classList.add('square');
        i++;
        gameBoard.append(square);
        square.addEventListener('click', _takeTurn);
      });
    }
    content.append(gameBoard);
  }


  const _takeTurn = (e, player) => {
    let currentSquareIndex = e.target.dataset.index;
    console.log(currentSquareIndex);
    e.target.style.backgroundColor = '#535353';

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
    // const takeTurn = () => {
    //   console.log(`Player ${name} made a move`);
    //   score++;
    //   console.log(score);
    // }
  
    return {
      // takeTurn,
    }
  }

  return {
    addPlayer,
    newPlayer,
  }
})()


// const tom = Gameboard.newPlayer('tom');
// tom.takeTurn();
// const mary = Gameboard.newPlayer('mary');

