import { Flex, SelectList, Box, Button } from 'gestalt';
import { useState } from 'react';

export default function App() {
  const [level, setLevel] = useState('');
  const levels = [
    { value: 'beginer', label: 'Beginer' },
    { value: 'advantage', label: 'Advantage' }
  ];
  const endpointsMap = {
    beginer: 'https://tiki-minesweeper.herokuapp.com/getMines?size=9&mines=10',
    advantage: 'https://tiki-minesweeper.herokuapp.com/getMines?size=16&mines=40'
  };
  const fetchMinesAxis = async () => {
    const rawResponse = await fetch(endpointsMap[level]);
    const response = await rawResponse.json();
    const data = response.data;
  };
  return (
    <div className="App">
      <Box as="header">
        <Flex justifyContent="center" alignItems="center">
          <SelectList
            id="select-level"
            options={levels}
            onChange={({ value }) => setLevel(value)}
            placeholder="Select level"
            value={level}
          />
          <div className="ml-3">
            <Button
              disabled={!level}
              text="Start game"
              color="blue"
              className="mt-4"
              onClick={fetchMinesAxis}
            />
          </div>
        </Flex>
      </Box>
      <Box as="main"></Box>
    </div>
  );
}
