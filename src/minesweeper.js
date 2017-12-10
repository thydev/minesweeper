const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  const board = [];
  for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
    const row = [];
    for(let colIndex = 0; colIndex < numberOfColumns; colIndex++){
      row.push(' ');
    }
    board.push(row);
  }

  return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  const board = [];
  for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
    const row = [];
    for(let colIndex = 0; colIndex < numberOfColumns; colIndex++){
      row.push(null);
    }
    board.push(row);
  }

  let numberOfBombsPlaced = 0;
  const placedBombPosition = []; // Store the position of the placed bombs

  while (numberOfBombsPlaced < numberOfBombs) {
    const randomeRowIndex = Math.floor(Math.random() * numberOfRows);
    const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    //If there is not any bombs in this position
    //
    if (placedBombPosition.findIndex(p => p.join('-') === randomeRowIndex + '-' + randomColumnIndex) === -1) {
      board[randomeRowIndex][randomColumnIndex] = 'B';
      placedBombPosition.push([randomeRowIndex, randomColumnIndex]);
      numberOfBombsPlaced++;
    }

  }

  return board;
};

const printBoard = board => {
    console.log(board.map(row => row.join(' | ')).join('\n'));
};

const playerBoard = generatePlayerBoard(3, 3);
const bombBoard = generateBombBoard(3,3,2);
console.log('Player board:');
console.log(printBoard(playerBoard));
console.log('Bomb board:');
console.log(printBoard(bombBoard));
