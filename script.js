var Gameboard = (function() {
  let gameOn = false;
  board = ['x', 'x', 'x', 'o', 'o', 'o', 'x', 'x', 'x'];
  const playerForm = document.querySelector('.player-form');
  const content = document.querySelector('.content');
  const gameBoard = document.createElement('div');
  gameBoard.classList.add('game-board');
  const start = document.querySelector('.start');

  const renderBoard = () => {
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


  const _toggleForm = () => {
    if (playerForm.style.display === 'flex') {
      playerForm.style.display = 'none';
    } else {
      playerForm.style.display = 'flex';
    }
  }

  const gameInit = (e) => {
    e.preventDefault();
    let player1 = document.querySelector('#player1').value;
    let player2 = document.querySelector('#player2').value;
    console.log(`Player ${player1} and player ${player2} have joined the game`);
    renderBoard();
    _toggleForm();
  }

  start.addEventListener('click', _toggleForm);
  playerForm.addEventListener('submit', gameInit);
  
  const _takeTurn = (e, player) => {
    let currentSquareIndex = e.target.dataset.index;
    console.log(currentSquareIndex);
    e.target.style.backgroundColor = '#535353';
  }




})();



