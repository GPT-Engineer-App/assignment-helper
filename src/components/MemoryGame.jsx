import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    initializeCards();
  }, []);

  const initializeCards = () => {
    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, content: emoji, flipped: false, solved: false }));
    setCards(shuffledCards);
  };

  const handleCardClick = (id) => {
    if (flipped.length === 2 || disabled) return;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      checkForMatch(newFlipped);
    }
  };

  const checkForMatch = (flippedCards) => {
    const [first, second] = flippedCards;
    if (cards[first].content === cards[second].content) {
      setSolved([...solved, cards[first].content]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  const resetGame = () => {
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
    initializeCards();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <Card 
            key={card.id} 
            className={`h-20 flex items-center justify-center text-3xl cursor-pointer ${
              flipped.includes(card.id) || solved.includes(card.content) ? '' : 'bg-primary text-primary-foreground'
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            <CardContent>
              {flipped.includes(card.id) || solved.includes(card.content) ? card.content : ''}
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={resetGame}>Reset Game</Button>
    </div>
  );
};

export default MemoryGame;