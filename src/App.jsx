import {
  Flex,
  SelectList,
  Box,
  Button,
  Modal,
  Layer,
  CompositeZIndex,
  FixedZIndex,
  Text
} from 'gestalt';
import { useDispatch, useSelector } from 'react-redux';
import { generateMap } from './utils';
import { endpointsMap, matrixInfoByLevel, levels } from './constants';
import {
  updateMinesCoordinate,
  setMatrix,
  setFetching,
  setShowModalEndGame,
  setRemainingHidden,
  resetStore,
  setLevel
} from './store/slice';

import Game from './sections/Game';

const App = () => {
  const showModalEndGame = useSelector((state) => state.showModalEndGame);
  const gameEndedStatus = useSelector((state) => state.gameEndedStatus);
  const level = useSelector((state) => state.level);
  const time = useSelector((state) => state.time);
  const dispatch = useDispatch();
  const resultZIndex = new FixedZIndex(1);
  const zIndex = new CompositeZIndex([resultZIndex]);

  const fetchMinesAxis = async () => {
    dispatch(setFetching(true));
    const rawResponse = await fetch(endpointsMap[level]);
    const response = await rawResponse.json();
    const data = response.data;
    dispatch(setMatrix(generateMap(level, data)));
    dispatch(updateMinesCoordinate(data));
    dispatch(setFetching(false));
    dispatch(
      setRemainingHidden(matrixInfoByLevel[level].quantity - matrixInfoByLevel[level].mines)
    );
    dispatch({ type: 'INCREMENT_TIME' });
  };
  const onRestart = () => {
    onStart();
    dispatch(setShowModalEndGame(false));
  };
  const onStart = () => {
    const currentLevel = level;
    dispatch(resetStore());
    dispatch(setLevel(currentLevel));
    fetchMinesAxis();
  };
  const getTimeFormat = () => {
    let minute,
      hour,
      second = 0;
    let temp = Math.floor(time / 60);
    if (temp < 1) {
      second = time;
    } else {
      if (temp <= 60) {
        second = time - 60 * Math.floor(time / 60);
        minute = temp;
      } else {
        minute = Math.floor(temp / 60) - 60 * Math.floor(temp / 60);
        temp = Math.floor(temp / 60);
        hour = temp;
      }
    }
    const getFormatShow = (timeFormat, theLast = false) => {
      if (timeFormat > 0) {
        return `${timeFormat < 10 ? '0' + timeFormat : timeFormat}${!theLast ? ':' : ''}`;
      }
      return `00${!theLast ? ':' : ''}`;
    };
    const secondShow = getFormatShow(second, true);
    const minuteShow = getFormatShow(minute);
    const hourShow = getFormatShow(hour);
    return hourShow + minuteShow + secondShow;
  };
  return (
    <div className="App">
      <Box as="header" marginTop={12}>
        <Flex justifyContent="center" alignItems="center">
          <div className="mr-4">{getTimeFormat()}</div>
          <SelectList
            id="select-level"
            options={levels}
            onChange={({ value }) => dispatch(setLevel(value))}
            placeholder="Select level"
            value={level}
          />
          <div className="ml-3">
            <Button
              disabled={!level}
              text="Start game"
              color="blue"
              className="mt-4"
              onClick={() => onStart()}
            />
          </div>
        </Flex>
      </Box>
      <Game />
      {showModalEndGame && (
        <Layer zIndex={zIndex}>
          <Modal
            heading={gameEndedStatus === 'win' ? 'You win!!!' : 'You failed!!!'}
            onDismiss={() => dispatch(setShowModalEndGame(false))}
            footer={
              <Flex alignItems="center" justifyContent="end">
                <Button color="blue" text="Restart" onClick={() => onRestart()} />
              </Flex>
            }>
            <Text align="center" size="lg">
              You {gameEndedStatus === 'win' ? 'won' : 'lost'} the game in {getTimeFormat()}
            </Text>
          </Modal>
        </Layer>
      )}
    </div>
  );
};

export default App;
