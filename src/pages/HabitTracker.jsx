import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  const addHabit = () => {
    if (newHabit.trim() !== "") {
      setHabits([...habits, { name: newHabit, completed: false }]);
      setNewHabit("");
    }
  };

  const toggleHabit = (index) => {
    const updatedHabits = habits.map((habit, i) =>
      i === index ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updatedHabits);
  };

  const deleteHabit = (index) => {
    const updatedHabits = habits.filter((_, i) => i !== index);
    setHabits(updatedHabits);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Habit Tracker</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add New Habit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="Enter a new habit"
            />
            <Button onClick={addHabit}>Add</Button>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {habits.map((habit, index) => (
          <Card key={index}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={habit.completed}
                  onCheckedChange={() => toggleHabit(index)}
                  id={`habit-${index}`}
                />
                <Label htmlFor={`habit-${index}`} className={habit.completed ? "line-through" : ""}>
                  {habit.name}
                </Label>
              </div>
              <Button variant="destructive" size="sm" onClick={() => deleteHabit(index)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HabitTracker;