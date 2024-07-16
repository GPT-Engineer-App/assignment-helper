import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUserProgress } from '@/integrations/supabase';
import { Badges } from './Badges';

const RewardSystem = () => {
  const { data: userProgress, isLoading, error } = useUserProgress();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const earnedBadges = userProgress?.earned_badges || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rewards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Points: {userProgress?.points || 0}</p>
          </div>
          <div>
            <p className="font-semibold mb-2">Level Progress</p>
            <Progress value={(userProgress?.points % 100) || 0} max={100} />
          </div>
          <div>
            <p className="font-semibold mb-2">Badges:</p>
            <Badges earnedBadges={earnedBadges} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardSystem;