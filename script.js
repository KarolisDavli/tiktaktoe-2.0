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
      game.updateTurnDisplay(`Next to move: Player 1`);
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

  let gg = false;

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let playerOne = createPlayer('Player 1', 'x');
  let playerTwo = createPlayer('Player 2', 'o');
  let activePlayer = playerOne;
  let activePlayerDisplay = document.querySelector('.active-player-display');

  const _getNextPlayer = () => {
    activePlayer == playerOne ? activePlayer = playerTwo : activePlayer = playerOne;
    return activePlayer;
  }

  const updateTurnDisplay = (msg) => {
    activePlayerDisplay.innerText = msg;
    gameArea.content.append(activePlayerDisplay);
  }

  const _placeActiveSymbol = (e) => {
    activePlayer == playerOne ? e.target.style.backgroundImage = "url('img/brush-solid.svg')" : e.target.style.backgroundImage = "url('img/ghost-solid.svg')";
  }

  const takeTurn = (e) => {
    let currentSquareIndex = e.target.dataset.index;

    if (gameArea.board[currentSquareIndex] == '' && gg === false) {
      gameArea.board[currentSquareIndex] = activePlayer.marker;
      _getNextPlayer();
      updateTurnDisplay(`Next to move: ${activePlayer.name}`);
      _checkWinCondition();
      _placeActiveSymbol(e);
      _checkIfTie();
    }
  }

  const _checkIfTie = () => {
    let emptyTile = gameArea.board.some((tile) => {
      return tile == '';
    })
    if (!emptyTile) {
      updateTurnDisplay('Tie! Hit \'Reset Game\' to play again');
    }
  }

  const _checkWinCondition = () => {
    let win = winConditions.find((condition) => {
      const a = condition[0];
      const b = condition[1];
      const c = condition[2];
      return gameArea.board[a] && gameArea.board[a] === gameArea.board[b] && gameArea.board[a] === gameArea.board[c];
    });


    if (win) {
      updateTurnDisplay(`Game over: ${activePlayer.name} wins.
      Reset Game to play again`);
      gg = true;
    }
  }

  

  const resetGame = () => {
    gameArea.board = ['', '', '', '', '', '', '', '', '',];
    gg = false;
    activePlayer = playerOne;
    updateTurnDisplay(`Next to move: ${activePlayer.name}`);
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