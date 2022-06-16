import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'store',
  initialState: {
    level: '',
    minesCoordinate: [],
    fetching: false,
    matrix: [],
    showModalEndGame: false,
    time: 0,
    gameEnded: false,
    gameEndedStatus: '',
    remainingHidden: -1
  },
  reducers: {
    updateMinesCoordinate: (state, action) => {
      state.minesCoordinate = action.payload;
    },
    setFetching: (state, action) => {
      state.fetching = action.payload;
    },
    setMatrix: (state, action) => {
      state.matrix = action.payload;
    },
    setShowModalEndGame: (state, action) => {
      state.showModalEndGame = action.payload;
    },
    setTime: (state, action) => {
      state.time += action.payload;
    },
    resetTime: (state) => {
      state.time = 0;
    },
    setGameEnded: (state, action) => {
      state.gameEnded = action.payload;
    },
    setGameEndedStatus: (state, action) => {
      state.gameEndedStatus = action.payload;
    },
    setRemainingHidden: (state, action) => {
      state.remainingHidden = action.payload;
      if (state.remainingHidden === 0 && !state.gameEnded) {
        state.gameEnded = true;
        state.gameEndedStatus = 'win';
        state.showModalEndGame = true;
      }
    },
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    resetStore: (state) => {
      state.level = '';
      state.minesCoordinate = [];
      state.fetching = false;
      state.matrix = [];
      state.showModalEndGame = false;
      state.time = 0;
      state.gameEnded = false;
      state.gameEndedStatus = '';
      state.remainingHidden = -1;
    }
  }
});

export const {
  updateMinesCoordinate,
  setFetching,
  setMatrix,
  setShowModalEndGame,
  setTime,
  resetTime,
  setGameEnded,
  setGameEndedStatus,
  setRemainingHidden,
  setLevel,
  resetStore
} = slice.actions;
export default slice.reducer;
