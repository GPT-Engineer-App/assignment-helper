import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Confetti } from "@/components/ui/confetti";
import { EncouragingMessage } from "@/components/EncouragingMessage";
import TicTacToe from "@/components/TicTacToe";
import RewardSystem from "@/components/RewardSystem";
import StreakTracker from "@/components/StreakTracker";
import Leaderboard from "@/components/Leaderboard";
import Challenges from "@/components/Challenges";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Index = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);

  const handleTaskCompletion = () => {
    setShowConfetti(true);
    setShowEncouragement(true);
    setTimeout(() => {
      setShowConfetti(false);
      setShowEncouragement(false);
    }, 5000);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Assignment Management App</h1>
      <p className="text-xl mb-8 text-center">Welcome to your personal assignment and time management assistant!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Link to="/assignments">
          <Button size="lg" className="w-full">Track Assignments</Button>
        </Link>
        <Link to="/time-management">
          <Button size="lg" className="w-full">Manage Time</Button>
        </Link>
        <Link to="/progress">
          <Button size="lg" className="w-full">Monitor Progress</Button>
        </Link>
        <Link to="/task-breakdown">
          <Button size="lg" className="w-full">Visual Task Breakdown</Button>
        </Link>
        <Link to="/habits">
          <Button size="lg" className="w-full">Habit Tracker</Button>
        </Link>
        <Link to="/emotional-checkins">
          <Button size="lg" className="w-full">Emotional Check-ins</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <RewardSystem />
        <StreakTracker />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Leaderboard />
        <Challenges />
      </div>

      <div className="mb-8 text-center">
        <Button onClick={handleTaskCompletion} className="mb-4">
          Simulate Task Completion
        </Button>
        {showConfetti && <Confetti />}
        {showEncouragement && <EncouragingMessage />}
      </div>

      <div className="text-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Take a Break</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Time for a quick break!</DialogTitle>
              <DialogDescription>
                Play a quick game of Tic-Tac-Toe to refresh your mind.
              </DialogDescription>
            </DialogHeader>
            <TicTacToe />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;