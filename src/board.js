//export { Board };

export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBomb = numberOfBombs;
    this._numberOfEmptySpaces = numberOfRows * numberOfColumns;

    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  print() {
      console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }
  hasNonBombEmptySpaces() {
    return this._numberOfBomb !== this._numberOfEmptySpaces;
  }
  static generatePlayerBoard (numberOfRows, numberOfColumns) {
    const board = [];
    for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
      const row = [];
      for(let colIndex = 0; colIndex < numberOfColumns; colIndex++){
        row.push(' ');
      }
      board.push(row);
    }

    return board;
  }

  static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
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
  }

  flipTile (rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    }

    if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeightborBombs(rowIndex, columnIndex);
      this._numberOfEmptySpaces--;
    }
  }

  getNumberOfNeightborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1,-1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach( offset => {
      const neighborRowIndex = rowIndex + offset[0] ;
      const neightborColumnIndex = columnIndex + offset[1];

      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
          neightborColumnIndex >=0 && neightborColumnIndex < numberOfColumns) {
            if (this._bombBoard[neighborRowIndex][neightborColumnIndex] === 'B') {
              numberOfBombs++;
            }
      }
    });
    return numberOfBombs;
  }
}
