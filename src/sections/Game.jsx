import { Box, Flex, Pulsar, Icon } from 'gestalt';
import { useDispatch, useSelector } from 'react-redux';
import { updateHiddenMatrixWithSelected, showAllMine } from '../utils';
import { matrixInfoByLevel } from '../constants';
import {
  setMatrix,
  setGameEnded,
  setGameEndedStatus,
  setRemainingHidden,
  setShowModalEndGame
} from '../store/slice';

export default function Game() {
  const fetching = useSelector((state) => state.fetching);
  const matrix = useSelector((state) => state.matrix);
  const level = useSelector((state) => state.level);
  const minesCoordinate = useSelector((state) => state.minesCoordinate);
  const remainingHidden = useSelector((state) => state.remainingHidden);

  const dispatch = useDispatch();

  const onClick = ({ column, x, y }) => {
    if (!column.hidden || column.isFlag) {
      return;
    }
    const cloneMatrix = JSON.parse(JSON.stringify(matrix));
    if (column.isMine) {
      showAllMine(cloneMatrix, minesCoordinate);
      dispatch(setGameEnded(true));
      dispatch(setGameEndedStatus('lost'));
      dispatch(setShowModalEndGame(true));
    } else if (column.aroundMineQuantity > 0) {
      cloneMatrix[y][x].hidden = false;
      dispatch(setRemainingHidden(remainingHidden - 1));
    } else {
      const countShowMatrix = updateHiddenMatrixWithSelected(cloneMatrix, { x, y });
      dispatch(setRemainingHidden(remainingHidden - countShowMatrix));
    }
    dispatch(setMatrix(cloneMatrix));
  };
  const onRightClick = ({ x, y, e }) => {
    e.preventDefault();
    if (!matrix[y][x].hidden) return;
    const cloneMatrix = JSON.parse(JSON.stringify(matrix));
    cloneMatrix[y][x].isFlag = !cloneMatrix[y][x].isFlag;
    dispatch(setMatrix(cloneMatrix));
  };

  return (
    <Box as="main" marginTop={12}>
      <Flex wrap justifyContent="center">
        {fetching && <Pulsar />}
        {!fetching && (
          <div style={{ width: 40 * (matrixInfoByLevel?.[level]?.row || 0) }}>
            {matrix.map((row, keyRow) => (
              <Flex key={keyRow}>
                {row.map((column, keyColumn) => (
                  <div
                    className={`column-matrix ${column.hidden && 'hidden'} bg-gray-roboflow-${
                      !column.hidden ? '50' : '300'
                    }`}
                    key={keyColumn}
                    onClick={() => onClick({ x: keyColumn, y: keyRow, column })}
                    onContextMenu={(e) => onRightClick({ x: keyColumn, y: keyRow, e })}>
                    <Flex alignItems="center" justifyContent="center" width="100%" height="100%">
                      {!column.hidden && column.isMine && (
                        <Icon icon="smiley-outline" color="error" />
                      )}
                      {!column.hidden && (
                        <span
                          className={`${
                            column.aroundMineQuantity === 2 && 'color-green-matchacado-500'
                          } ${column.aroundMineQuantity === 3 && 'color-purple-mysticool-500'}`}>
                          {column.aroundMineQuantity > 0 && column.aroundMineQuantity}
                        </span>
                      )}
                      {column.isFlag && <Icon icon="flag" color="warning" />}
                    </Flex>
                  </div>
                ))}
              </Flex>
            ))}
          </div>
        )}
      </Flex>
    </Box>
  );
}
