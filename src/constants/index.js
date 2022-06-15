export const endpointsMap = {
  beginer: 'https://tiki-minesweeper.herokuapp.com/getMines?size=9&mines=10',
  advantage: 'https://tiki-minesweeper.herokuapp.com/getMines?size=16&mines=40'
};

export const matrixInfoByLevel = {
  beginer: {
    row: 9,
    quantity: 9 * 9,
    mines: 10
  },
  advantage: {
    row: 16,
    quantity: 16 * 16,
    mines: 10
  }
};

export const levels = [
  { value: 'beginer', label: 'Beginer' },
  { value: 'advantage', label: 'Advantage' }
];
