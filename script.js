const createPlayer = (name, marker) => {
  return {name, marker};
}

const gameboard = (() => {

  let gameOn = false;
  let board = ['', '', '', '', '', '', '', '', '',];
  const content = document.querySelector('.content');
  const gameBoard = document.createElement('div');
  gameBoard.classList.add('game-board');
  const start = document.querySelector('.start');

  const addClickEvents = () => {
    let i = 0;
    board.forEach(square => {
      square = document.createElement('div');
      square.setAttribute('data-index', i);
      square.classList.add('square');
      i++;
      gameBoard.append(square);
      square.addEventListener('click', game.takeTurn);
    });
  }

  const _renderBoard = () => {
    if (gameOn) {
      alert('Game already started');
    } else {
      gameOn = true;
      addClickEvents();
    }
    content.append(gameBoard);
  }


  start.addEventListener('click', _renderBoard);
  
  return {
    board,
    content
  }

})();





const game = (() => {
  let playerOne = createPlayer('Player 1', 'x');
  let playerTwo = createPlayer('Player 2', 'o');
  console.log(playerOne);

  let activePlayer = playerOne;
  let activePlayerDisplay = document.querySelector('.active-player-display');

  const getNextPlayer = () => {
    activePlayer == playerOne ? activePlayer = playerTwo : activePlayer = playerOne;
    return activePlayer;
  }

  console.log(getNextPlayer().name);


  const updateDisplay = () => {
    activePlayerDisplay.innerText = getNextPlayer().name;
    gameboard.content.append(activePlayerDisplay);
  }

  const takeTurn = (e) => {
    let currentSquareIndex = e.target.dataset.index;
    console.log(currentSquareIndex);
    e.target.style.backgroundColor = '#535353';
    getNextPlayer();
    updateDisplay();
    gameboard.board[currentSquareIndex] = activePlayer.marker;
    console.log(gameboard.board);
  }

  return {
    takeTurn
  }

})();