const createPlayer = (name, marker) => {
  return {name, marker};
}

const gameArea = (() => {

  let gameOn = false;
  let board = ['', '', '', '', '', '', '', '', '',];

  const content = document.querySelector('.content');
  const start = document.querySelector('.start');
  const controls = document.querySelector('.controls');
  const gameBoard = document.createElement('div');
  gameBoard.classList.add('game-board');


  const _renderGameResetBtn = () => {
    const reset = document.createElement('button');
    reset.innerText = 'Reset Game';
    reset.classList.add('reset');
    controls.appendChild(reset);
    reset.addEventListener('click', game.resetGame);
  }

  const _addClickEvents = () => {
    let indextCounter = 0;
    board.forEach(square => {
      square = document.createElement('div');
      square.setAttribute('data-index', indextCounter);
      square.classList.add('square');
      square.addEventListener('click', game.takeTurn);
      gameBoard.append(square);
      indextCounter++;
    });
  }

  const _gameInit = () => {
    if (gameOn) {
      alert('Game already started');
    } else {
      gameOn = true;
      game.updateTurnDisplay();
      _addClickEvents();
      _renderGameResetBtn();
    }
    content.appendChild(gameBoard);
  }


  start.addEventListener('click', _gameInit);
  
  return {
    board,
    content
  }
})();





const game = (() => {
  let playerOne = createPlayer('Player 1', 'x');
  let playerTwo = createPlayer('Player 2', 'o');

  let activePlayer = playerOne;
  let activePlayerDisplay = document.querySelector('.active-player-display');

  const _getNextPlayer = () => {
    activePlayer == playerOne ? activePlayer = playerTwo : activePlayer = playerOne;
    return activePlayer;
  }

  const updateTurnDisplay = () => {
    activePlayerDisplay.innerText = `Next to move: ${activePlayer.name}`;
    gameArea.content.append(activePlayerDisplay);
  }

  const _placeActiveSymbol = (e) => {
    activePlayer == playerOne ? e.target.style.backgroundImage = "url('img/brush-solid.svg')" : e.target.style.backgroundImage = "url('img/ghost-solid.svg')"
  }

  const takeTurn = (e) => {
    let currentSquareIndex = e.target.dataset.index;

    if (gameArea.board[currentSquareIndex] == '') {
      gameArea.board[currentSquareIndex] = activePlayer.marker;
      _placeActiveSymbol(e);
      _getNextPlayer();
      updateTurnDisplay();
      console.log(gameArea.board);
    } else {
      alert('Choose other tile')
    }
  }

  const resetGame = () => {
    gameArea.board = ['', '', '', '', '', '', '', '', '',];
    activePlayer = playerOne;
    updateTurnDisplay();
    console.log(gameArea.board);
    let elemPictures = document.querySelectorAll('.square');
    elemPictures.forEach(el => {
      el.style.backgroundImage = '';
    })
    
  }








  return {
    takeTurn,
    resetGame,
    updateTurnDisplay
  }
})();