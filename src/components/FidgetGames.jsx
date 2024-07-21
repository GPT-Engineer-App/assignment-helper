import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TicTacToe from './TicTacToe';
import MemoryGame from './MemoryGame';
import Puzzle from './Puzzle';
import { useUserProgress } from '@/integrations/supabase';
import { Lock } from 'lucide-react';

const games = [
  { id: 'tictactoe', name: 'Tic-Tac-Toe', component: TicTacToe, requiredPoints: 0 },
  { id: 'memory', name: 'Memory Game', component: MemoryGame, requiredPoints: 50 },
  { id: 'puzzle', name: 'Puzzle', component: Puzzle, requiredPoints: 100 },
];

const FidgetGames = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const { data: userProgress, isLoading, error } = useUserProgress();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const userPoints = userProgress?.points || 0;

  const handleGameSelect = (game) => {
    if (userPoints >= game.requiredPoints) {
      setSelectedGame(game);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Fidget Games</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {games.map((game) => (
          <Card key={game.id} className={userPoints < game.requiredPoints ? 'opacity-50' : ''}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {game.name}
                {userPoints < game.requiredPoints && <Lock className="h-4 w-4" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleGameSelect(game)} 
                disabled={userPoints < game.requiredPoints}
              >
                {userPoints < game.requiredPoints ? `Unlock at ${game.requiredPoints} points` : 'Play'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedGame && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedGame.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <selectedGame.component />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FidgetGames;