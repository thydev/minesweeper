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

  while (numberOfBombsPlaced < numberOfBombs) {
    const randomeRowIndex = Math.floor(Math.random() * numberOfRows);
    const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    //If there is not any bombs in this location
    if (board[randomeRowIndex][randomColumnIndex] !== 'B') {
      board[randomeRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
    }

  }

  return board;
};

const getNumberOfNeightborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [
    [-1,-1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;

  neighborOffsets.forEach( offset => {
    const neighborRowIndex = rowIndex + offset[0] ;
    const neightborColumnIndex = columnIndex + offset[1];

    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
        neightborColumnIndex >=0 && neightborColumnIndex < numberOfColumns) {
          if (bombBoard[neighborRowIndex][neightborColumnIndex] === 'B') {
            numberOfBombs++;
          }
    }
  });
  return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile has already been flipped!');
    return;
  }

  if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeightborBombs(bombBoard, rowIndex, columnIndex);
  }
};

const printBoard = board => {
    console.log(board.map(row => row.join(' | ')).join('\n'));
};

const playerBoard = generatePlayerBoard(5, 5);
const bombBoard = generateBombBoard(5,5,7);
console.log('Player board:');
console.log(printBoard(playerBoard));
console.log('Bomb board:');
console.log(printBoard(bombBoard));
flipTile(playerBoard, bombBoard, 2, 3);
console.log('Updated Player board:');
console.log(printBoard(playerBoard));
