import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flowchart } from "@/components/Flowchart";

const VisualTaskBreakdown = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", steps: "" });

  const handleAddTask = () => {
    if (newTask.title && newTask.steps) {
      setTasks([...tasks, { ...newTask, steps: newTask.steps.split('\n') }]);
      setNewTask({ title: "", steps: "" });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Visual Task Breakdown</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="taskTitle">Task Title</Label>
                <Input
                  id="taskTitle"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <Label htmlFor="taskSteps">Task Steps (one per line)</Label>
                <Textarea
                  id="taskSteps"
                  value={newTask.steps}
                  onChange={(e) => setNewTask({ ...newTask, steps: e.target.value })}
                  placeholder="Enter task steps"
                  rows={5}
                />
              </div>
              <Button onClick={handleAddTask}>Add Task</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Task Flowchart</CardTitle>
          </CardHeader>
          <CardContent>
            <Flowchart tasks={tasks} />
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Task List</h2>
        {tasks.map((task, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside">
                {task.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VisualTaskBreakdown;