import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const badgeData = [
  { id: 'streak-7', name: '7 Day Streak', description: 'Maintained a 7-day streak', icon: '🔥' },
  { id: 'tasks-10', name: 'Task Master', description: 'Completed 10 tasks', icon: '✅' },
  { id: 'study-time-5', name: 'Study Champion', description: 'Logged 5 hours of study time', icon: '📚' },
  // Add more badges as needed
];

export const Badges = ({ earnedBadges }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <TooltipProvider>
        {badgeData.map((badge) => (
          <Tooltip key={badge.id}>
            <TooltipTrigger>
              <Badge variant={earnedBadges.includes(badge.id) ? "default" : "outline"} className="text-lg">
                {badge.icon}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">{badge.name}</p>
              <p>{badge.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};