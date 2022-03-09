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
    board
  }

})();





const game = (() => {
  let playerOne = createPlayer('Player 1', 'x');
  console.log(playerOne);

  let currentPlayer = playerOne;

  const takeTurn = (e) => {
    let currentSquareIndex = e.target.dataset.index;
    console.log(currentSquareIndex);
    e.target.style.backgroundColor = '#535353';
    gameboard.board[currentSquareIndex] = currentPlayer.marker;
    console.log(gameboard.board);
  }

  return {
    takeTurn
  }

})();