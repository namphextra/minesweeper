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
  return (
    <div className="App">
      <Box as="header" marginTop={12}>
        <Flex justifyContent="center" alignItems="center">
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
              {gameEndedStatus === 'win'
                ? 'You nailed it. Choose a higher level to more challenge'
                : 'You need use more brain to win the game ^^'}
            </Text>
          </Modal>
        </Layer>
      )}
    </div>
  );
};

export default App;
