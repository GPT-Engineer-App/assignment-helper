import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Play, Pause, RotateCcw } from "lucide-react";

const TimeManagement = () => {
  const [timer, setTimer] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState("");

  useEffect(() => {
    let interval = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsActive(false);
      alert("Time's up! Take a break.");
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTimer(25 * 60);
    setIsActive(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Time Management Tools</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Pomodoro Timer</h2>
          <div className="flex items-center space-x-4">
            <div className="text-4xl font-mono">{formatTime(timer)}</div>
            <Button onClick={toggleTimer}>
              {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button onClick={resetTimer}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Break Reminder</h2>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <p>Remember to take a 5-minute break after each Pomodoro session!</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Estimated Time for Completion</h2>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Enter estimated time (minutes)"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
            />
            <Button onClick={() => console.log("Estimated time set:", estimatedTime)}>
              Set
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeManagement;