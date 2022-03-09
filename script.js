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

  let activePlayer = playerOne;
  let activePlayerDisplay = document.querySelector('.active-player-display');

  const _getNextPlayer = () => {
    activePlayer == playerOne ? activePlayer = playerTwo : activePlayer = playerOne;
    return activePlayer;
  }

  const _updateTurnDisplay = () => {
    activePlayerDisplay.innerText = activePlayer.name;
    gameboard.content.append(activePlayerDisplay);
  }

  const _placeActiveSymbol = (e) => {
    activePlayer == playerOne ? e.target.style.backgroundImage = "url('img/brush-solid.svg')" : e.target.style.backgroundImage = "url('img/ghost-solid.svg')"
  }

  const takeTurn = (e) => {
    console.log(e.target.dataset.index);
    _placeActiveSymbol(e);
    _getNextPlayer();
    _updateTurnDisplay();
    gameboard.board[e.target.dataset.index] = activePlayer.marker;
    console.log(gameboard.board);
  }



  return {
    takeTurn
  }

})();