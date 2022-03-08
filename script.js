const createPlayer = (name, marker) => {
  return {name, marker};
}

const gameboard = (() => {
  let gameOn = false;
  board = ['', '', '', '', '', '', '', '', '',];
  const playerForm = document.querySelector('.player-form');
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
      square.addEventListener('click', takeTurn);
    });
  }

  const renderBoard = () => {
    if (gameOn) {
      alert('Game already started');
    } else {
      gameOn = true;
      addClickEvents();
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

    // let playerOneName = document.querySelector('#player1').value;
    // let playerTwoName = document.querySelector('#player2').value;
    
  const takeTurn = (e, playerTwo) => {
    let currentSquareIndex = e.target.dataset.index;
    console.log(currentSquareIndex);
    e.target.style.backgroundColor = '#535353';
    board[currentSquareIndex] = playerTwo;
    console.log(board);
  }

  const gameInit = (e) => {
    e.preventDefault();
    renderBoard();
    _toggleForm();
  }

  start.addEventListener('click', _toggleForm);
  playerForm.addEventListener('submit', gameInit);
  
})();



