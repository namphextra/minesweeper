import { put, takeEvery, call, select, delay } from 'redux-saga/effects';
import { setTime } from './slice';

export function* incrementAsync() {
  const state = yield select();
  if (state.gameEnded) {
    return;
  }
  yield delay(1000);
  yield put(setTime(1));
  yield call(incrementAsync);
}

// export function* watchIncrementAsync() {
//   console.log(999);
//   yield takeEvery('INCREMENT_TIME', incrementAsync);
// }

export default function* rootSaga() {
  yield takeEvery('INCREMENT_TIME', incrementAsync);
}
