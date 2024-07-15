import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

const ProgressMonitoring = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Math Assignment", status: "in progress", progress: 30 },
    { id: 2, name: "History Essay", status: "not started", progress: 0 },
    { id: 3, name: "Science Project", status: "completed", progress: 100 },
  ]);

  const updateTaskStatus = (id, status) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: status, progress: status === "completed" ? 100 : task.progress }
          : task
      )
    );
  };

  const updateTaskProgress = (id, progress) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, progress: progress } : task
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Progress Monitoring</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Task Status</h2>
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-2 mb-2">
              <Checkbox
                checked={task.status === "completed"}
                onCheckedChange={(checked) =>
                  updateTaskStatus(task.id, checked ? "completed" : "in progress")
                }
              />
              <span>{task.name}</span>
              <span className="text-sm text-gray-500">({task.status})</span>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Project Progress</h2>
          {tasks.map((task) => (
            <div key={task.id} className="mb-4">
              <div className="flex justify-between mb-1">
                <span>{task.name}</span>
                <span>{task.progress}%</span>
              </div>
              <Progress value={task.progress} className="w-full" />
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Weekly Summary</h2>
          <p>Completed tasks this week: {tasks.filter((task) => task.status === "completed").length}</p>
          <p>Tasks in progress: {tasks.filter((task) => task.status === "in progress").length}</p>
          <p>Tasks not started: {tasks.filter((task) => task.status === "not started").length}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressMonitoring;