import reducer, { setLevel, resetStore } from '../slice';

const initState = {
  level: '',
  minesCoordinate: [],
  fetching: false,
  matrix: [],
  showModalEndGame: false,
  time: 0,
  gameEnded: false,
  gameEndedStatus: '',
  remainingHidden: -1
};
test('Should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initState);
});

test('Should set level success', () => {
  const prevState = {
    level: ''
  };
  expect(reducer(prevState, setLevel('beginer'))).toEqual({
    level: 'beginer'
  });
});

test('Should reset store success', () => {
  expect(reducer(undefined, resetStore())).toEqual(initState);
});
