import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mic } from "lucide-react";
import VoiceCommands from "../components/VoiceCommands";

const Index = () => {
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
        <Link to="/task-breakdown">
          <Button size="lg" className="w-full md:w-auto">Visual Task Breakdown</Button>
        </Link>
      </div>
      <div className="mt-8">
        <VoiceCommands />
      </div>
    </div>
  );
};

export default Index;