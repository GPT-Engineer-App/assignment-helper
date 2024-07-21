import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUserProgress } from '@/integrations/supabase';
import { Badges } from './Badges';
import { Button } from "@/components/ui/button";
import { useUpdateUserProgress } from '@/integrations/supabase';

const RewardSystem = () => {
  const { data: userProgress, isLoading, error } = useUserProgress();
  const updateUserProgressMutation = useUpdateUserProgress();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const earnedBadges = userProgress?.earned_badges || [];
  const points = userProgress?.points || 0;
  const level = Math.floor(points / 100) + 1;
  const pointsToNextLevel = 100 - (points % 100);

  const handleAddPoints = async () => {
    try {
      await updateUserProgressMutation.mutateAsync({
        user_id: userProgress.user_id,
        points: points + 10,
      });
    } catch (error) {
      console.error('Error updating points:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rewards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Points: {points}</p>
            <p className="font-semibold">Level: {level}</p>
          </div>
          <div>
            <p className="font-semibold mb-2">Progress to Next Level</p>
            <Progress value={(points % 100)} max={100} />
            <p className="text-sm mt-1">{pointsToNextLevel} points to next level</p>
          </div>
          <div>
            <p className="font-semibold mb-2">Badges:</p>
            <Badges earnedBadges={earnedBadges} />
          </div>
          <Button onClick={handleAddPoints}>Add 10 Points (Demo)</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardSystem;