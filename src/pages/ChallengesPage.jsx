import React from 'react';
import Challenges from '@/components/Challenges';

const ChallengesPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Challenges</h1>
      <Challenges />
    </div>
  );
};

export default ChallengesPage;