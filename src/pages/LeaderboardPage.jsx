import React from 'react';
import Leaderboard from '@/components/Leaderboard';

const LeaderboardPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <Leaderboard />
    </div>
  );
};

export default LeaderboardPage;