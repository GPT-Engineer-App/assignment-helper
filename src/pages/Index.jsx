import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Confetti } from "@/components/ui/confetti";
import { EncouragingMessage } from "@/components/EncouragingMessage";
import TicTacToe from "@/components/TicTacToe";
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
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-6">Assignment Management App</h1>
      <p className="text-xl mb-8">Welcome to your personal assignment and time management assistant!</p>
      <div className="space-y-4">
        <Link to="/assignments">
          <Button size="lg" className="w-full md:w-auto">Track Assignments</Button>
        </Link>
        <Link to="/time-management">
          <Button size="lg" className="w-full md:w-auto">Manage Time</Button>
        </Link>
        <Link to="/progress">
          <Button size="lg" className="w-full md:w-auto">Monitor Progress</Button>
        </Link>
      </div>

      <div className="mt-8">
        <Button onClick={handleTaskCompletion} className="mb-4">
          Simulate Task Completion
        </Button>
        {showConfetti && <Confetti />}
        {showEncouragement && <EncouragingMessage />}
      </div>

      <div className="mt-8">
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