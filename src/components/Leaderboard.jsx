import React from 'react';
import { useLeaderboard } from '@/integrations/supabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Leaderboard = () => {
  const { data: leaderboardData, isLoading, error } = useLeaderboard();

  if (isLoading) return <div>Loading leaderboard...</div>;
  if (error) return <div>Error loading leaderboard: {error.message}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Points</TableHead>
              <TableHead>Streak</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.points}</TableCell>
                <TableCell>{user.streak}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;