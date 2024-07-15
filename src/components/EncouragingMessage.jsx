import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Smile } from "lucide-react";

const encouragingMessages = [
  "Great job! Keep up the good work!",
  "You're making excellent progress!",
  "Awesome! One step closer to your goals!",
  "Well done! You're crushing it!",
  "Fantastic work! You should be proud!",
];

export const EncouragingMessage = () => {
  const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];

  return (
    <Alert>
      <Smile className="h-4 w-4" />
      <AlertTitle>Congratulations!</AlertTitle>
      <AlertDescription>{randomMessage}</AlertDescription>
    </Alert>
  );
};