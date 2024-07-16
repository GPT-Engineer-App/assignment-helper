import React from 'react';
import { useChallenges } from '@/integrations/supabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Challenges = () => {
  const { data: challenges, isLoading, error } = useChallenges();

  if (isLoading) return <div>Loading challenges...</div>;
  if (error) return <div>Error loading challenges: {error.message}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Challenges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="space-y-2">
              <div className="flex justify-between">
                <p className="font-semibold">{challenge.name}</p>
                <p>{challenge.progress}/{challenge.goal} {challenge.unit}</p>
              </div>
              <Progress value={(challenge.progress / challenge.goal) * 100} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Challenges;