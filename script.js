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
  const controls = document.querySelector('.controls');


  const _renderGameResetBtn = () => {
    const reset = document.createElement('button');
    reset.innerText = 'Reset Game';
    reset.classList.add('reset');
    controls.appendChild(reset);
    reset.addEventListener('click', game.resetGame);
  }

  const _addClickEvents = () => {
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
      _addClickEvents();
      _renderGameResetBtn();
    }
    content.appendChild(gameBoard);
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

  let activePlayer = playerOne;
  let activePlayerDisplay = document.querySelector('.active-player-display');

  const _getNextPlayer = () => {
    activePlayer == playerOne ? activePlayer = playerTwo : activePlayer = playerOne;
    return activePlayer;
  }

  const _updateTurnDisplay = () => {
    activePlayerDisplay.innerText = `Next to move: ${activePlayer.name}`;
    gameboard.content.append(activePlayerDisplay);
  }

  const _placeActiveSymbol = (e) => {
    activePlayer == playerOne ? e.target.style.backgroundImage = "url('img/brush-solid.svg')" : e.target.style.backgroundImage = "url('img/ghost-solid.svg')"
  }

  const takeTurn = (e) => {
    let currentSquareIndex = e.target.dataset.index;

    if (gameboard.board[currentSquareIndex] == '') {
      gameboard.board[currentSquareIndex] = activePlayer.marker;
      console.log(gameboard.board[currentSquareIndex]);
      _placeActiveSymbol(e);
      _getNextPlayer();
      _updateTurnDisplay();
      console.log(gameboard.board);
    } else {
      alert('Choose other tile')
    }
  }

  const resetGame = () => {
    gameboard.board = ['', '', '', '', '', '', '', '', '',];
    activePlayer = playerOne;
    console.log(gameboard.board);
    let elemPictures = document.querySelectorAll('.square');
    elemPictures.forEach(el => {
      el.style.backgroundImage = '';
    })
    
  }








  return {
    takeTurn,
    resetGame
  }
})();