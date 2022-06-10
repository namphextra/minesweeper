const mapLengthByLevel = {
  beginer: 9,
  advantage: 16
};
export function generateMap(level, minesAxis) {
  const matrix = Array(mapLengthByLevel[level])
    .fill()
    .map(() => Array(mapLengthByLevel[level]).fill());
}
