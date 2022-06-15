const mapLengthByLevel = {
  beginer: 9,
  advantage: 16
};
export function generateMap(level, minesCoordinate) {
  const matrix = Array(mapLengthByLevel[level])
    .fill()
    .map(() =>
      Array(mapLengthByLevel[level])
        .fill()
        .map(() => ({ hidden: true, isMine: false, aroundMineQuantity: 0, isFlag: false }))
    );
  minesCoordinate.forEach((mineCoordinate) => {
    matrix[mineCoordinate.y][mineCoordinate.x].isMine = true;
  });
  findAroundMineQuantity(matrix);
  return matrix;
}

export function showAllMine(matrix, minesCoordinate) {
  minesCoordinate.forEach((mineCoordinate) => {
    matrix[mineCoordinate.y][mineCoordinate.x].hidden = false;
  });
}

export function updateHiddenMatrixWithSelected(matrix, selectedCoordinate) {
  const row = matrix[selectedCoordinate.y];
  const prevRow = matrix[selectedCoordinate.y - 1];
  const nextRow = matrix[selectedCoordinate.y + 1];
  let countShowMatrix = 0;
  if (!row[selectedCoordinate.x].isFlag) {
    row[selectedCoordinate.x].hidden = false;
    countShowMatrix += 1;
  }
  if (prevRow) {
    countShowMatrix += updatePrevRowWithSelected(matrix, prevRow, selectedCoordinate);
  }
  // Update for current row
  const currentRowPrevCol = row[selectedCoordinate.x - 1];
  if (currentRowPrevCol?.hidden && !currentRowPrevCol?.isFlag) {
    if (currentRowPrevCol?.aroundMineQuantity === 0) {
      countShowMatrix += updateHiddenMatrixWithSelected(matrix, {
        x: selectedCoordinate.x - 1,
        y: selectedCoordinate.y
      });
    } else {
      currentRowPrevCol.hidden = false;
      countShowMatrix += 1;
    }
  }
  const currentRowNextCol = row[selectedCoordinate.x + 1];
  if (currentRowNextCol?.hidden && !currentRowNextCol?.isFlag) {
    if (currentRowNextCol?.aroundMineQuantity === 0) {
      countShowMatrix += updateHiddenMatrixWithSelected(matrix, {
        x: selectedCoordinate.x + 1,
        y: selectedCoordinate.y
      });
    } else {
      currentRowNextCol.hidden = false;
      countShowMatrix += 1;
    }
  }
  if (nextRow) {
    countShowMatrix += updateNextRowWithSelected(matrix, nextRow, selectedCoordinate);
  }
  return countShowMatrix;
}

function updatePrevRowWithSelected(matrix, prevRow, selectedCoordinate) {
  let countShowMatrix = 0;

  const prevRowPrevCol = prevRow[selectedCoordinate.x - 1];
  if (prevRowPrevCol?.hidden && !prevRowPrevCol?.isFlag) {
    if (prevRowPrevCol?.aroundMineQuantity === 0) {
      countShowMatrix += updateHiddenMatrixWithSelected(matrix, {
        x: selectedCoordinate.x - 1,
        y: selectedCoordinate.y - 1
      });
    } else {
      countShowMatrix += 1;
      prevRowPrevCol.hidden = false;
    }
  }
  const prevRowCurrentCol = prevRow[selectedCoordinate.x];
  if (prevRowCurrentCol?.hidden && !prevRowCurrentCol?.isFlag) {
    if (prevRowCurrentCol?.aroundMineQuantity === 0) {
      countShowMatrix += updateHiddenMatrixWithSelected(matrix, {
        x: selectedCoordinate.x,
        y: selectedCoordinate.y - 1
      });
    } else {
      countShowMatrix += 1;
      prevRowCurrentCol.hidden = false;
    }
  }
  const prevRowNextCol = prevRow[selectedCoordinate.x + 1];
  if (prevRowNextCol?.hidden && !prevRowNextCol?.isFlag) {
    if (prevRowNextCol?.aroundMineQuantity === 0) {
      countShowMatrix += updateHiddenMatrixWithSelected(matrix, {
        x: selectedCoordinate.x + 1,
        y: selectedCoordinate.y - 1
      });
    } else {
      countShowMatrix += 1;
      prevRowNextCol.hidden = false;
    }
  }
  return countShowMatrix;
}
function updateNextRowWithSelected(matrix, nextRow, selectedCoordinate) {
  let countShowMatrix = 0;

  const nextRowPrevCol = nextRow[selectedCoordinate.x - 1];
  if (nextRowPrevCol?.hidden && !nextRowPrevCol?.isFlag) {
    if (nextRowPrevCol?.aroundMineQuantity === 0) {
      countShowMatrix += updateHiddenMatrixWithSelected(matrix, {
        x: selectedCoordinate.x - 1,
        y: selectedCoordinate.y + 1
      });
    } else {
      countShowMatrix += 1;
      nextRowPrevCol.hidden = false;
    }
  }
  const nextRowCurrentCol = nextRow[selectedCoordinate.x];
  if (nextRowCurrentCol?.hidden && !nextRowCurrentCol?.isFlag) {
    if (nextRowCurrentCol?.aroundMineQuantity === 0) {
      countShowMatrix += updateHiddenMatrixWithSelected(matrix, {
        x: selectedCoordinate.x,
        y: selectedCoordinate.y + 1
      });
    } else {
      countShowMatrix += 1;
      nextRowCurrentCol.hidden = false;
    }
  }
  const nextRowNextCol = nextRow[selectedCoordinate.x + 1];
  if (nextRowNextCol?.hidden && !nextRowNextCol?.isFlag) {
    if (nextRowNextCol?.aroundMineQuantity === 0) {
      countShowMatrix += updateHiddenMatrixWithSelected(matrix, {
        x: selectedCoordinate.x + 1,
        y: selectedCoordinate.y + 1
      });
    } else {
      countShowMatrix += 1;
      nextRowNextCol.hidden = false;
    }
  }
  return countShowMatrix;
}

function findAroundMineQuantity(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    const preRow = matrix[i - 1];
    const nextRow = matrix[i + 1];
    for (let j = 0; j < row.length; j++) {
      const column = row[j];
      if (column.isMine) {
        continue;
      }
      let mineCount = 0;
      if (preRow) {
        mineCount += countMineInRow(preRow, j);
      }
      if (nextRow) {
        mineCount += countMineInRow(nextRow, j);
      }
      mineCount += countMineInRow(row, j);
      column.aroundMineQuantity = mineCount;
    }
  }
}

function countMineInRow(row, currentColumnIndex) {
  let mineCount = 0;
  const preColumn = row[currentColumnIndex - 1];
  const currentColumn = row[currentColumnIndex];
  const nextColumn = row[currentColumnIndex + 1];
  if (preColumn && preColumn.isMine) {
    mineCount += 1;
  }
  if (currentColumn && currentColumn.isMine) mineCount += 1;
  if (nextColumn && nextColumn.isMine) mineCount += 1;
  return mineCount;
}
