import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserProgress } from '@/integrations/supabase';
import { Badges } from './Badges';

const StreakTracker = () => {
  const { data: userProgress, isLoading, error } = useUserProgress();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const streak = userProgress?.streak || 0;
  const earnedBadges = userProgress?.earned_badges || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Streak Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="font-semibold">Current Streak: {streak} days</p>
          <div className="flex space-x-2">
            {[...Array(7)].map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full ${
                  index < streak % 7 ? 'bg-green-500' : 'bg-gray-200'
                }`}
              ></div>
            ))}
          </div>
          <div>
            <p className="font-semibold mb-2">Streak Badges:</p>
            <Badges earnedBadges={earnedBadges} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakTracker;