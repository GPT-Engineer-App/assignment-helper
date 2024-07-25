import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserProgress } from '@/integrations/supabase';

const StreakTracker = () => {
  const { data: userProgress, isLoading, error } = useUserProgress();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const streak = userProgress?.streak || 0;

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
            <p className="font-semibold">Badges:</p>
            {/* Placeholder for badges. Replace with actual badge components when available */}
            <div className="flex space-x-2 mt-2">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="w-10 h-10 bg-yellow-200 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakTracker;