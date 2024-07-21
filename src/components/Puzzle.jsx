import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Puzzle = () => {
  const [tiles, setTiles] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    const numbers = Array.from({ length: 15 }, (_, i) => i + 1);
    numbers.push(null);
    shuffleArray(numbers);
    setTiles(numbers);
    setIsComplete(false);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleTileClick = (index) => {
    const emptyIndex = tiles.indexOf(null);
    if (isAdjacent(index, emptyIndex)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      checkCompletion(newTiles);
    }
  };

  const isAdjacent = (index1, index2) => {
    const row1 = Math.floor(index1 / 4);
    const col1 = index1 % 4;
    const row2 = Math.floor(index2 / 4);
    const col2 = index2 % 4;
    return (Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1);
  };

  const checkCompletion = (currentTiles) => {
    const solved = currentTiles.every((tile, index) => 
      (index === 15 && tile === null) || tile === index + 1
    );
    setIsComplete(solved);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2">
        {tiles.map((tile, index) => (
          <Card 
            key={index} 
            className={`h-20 flex items-center justify-center text-3xl cursor-pointer ${
              tile === null ? 'bg-secondary' : 'bg-primary text-primary-foreground'
            }`}
            onClick={() => handleTileClick(index)}
          >
            <CardContent>
              {tile}
            </CardContent>
          </Card>
        ))}
      </div>
      {isComplete && <p className="text-green-500 font-bold">Puzzle Completed!</p>}
      <Button onClick={initializePuzzle}>Reset Puzzle</Button>
    </div>
  );
};

export default Puzzle;