import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({ name: "", type: "personal", completed: false });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Load habits from local storage
    const savedHabits = localStorage.getItem("habits");
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  useEffect(() => {
    // Save habits to local storage
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (newHabit.name.trim() !== "") {
      setHabits([...habits, { ...newHabit, id: Date.now() }]);
      setNewHabit({ name: "", type: "personal", completed: false });
    }
  };

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const filteredHabits = habits.filter((habit) => {
    if (filter === "all") return true;
    return habit.type === filter;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Habit Tracker</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add New Habit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-2">
            <Input
              type="text"
              value={newHabit.name}
              onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
              placeholder="Enter a new habit"
            />
            <Select
              value={newHabit.type}
              onValueChange={(value) => setNewHabit({ ...newHabit, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addHabit}>Add</Button>
          </div>
        </CardContent>
      </Card>
      <div className="mb-4">
        <Label>Filter habits:</Label>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        {filteredHabits.map((habit) => (
          <Card key={habit.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={habit.completed}
                  onCheckedChange={() => toggleHabit(habit.id)}
                  id={`habit-${habit.id}`}
                />
                <Label htmlFor={`habit-${habit.id}`} className={habit.completed ? "line-through" : ""}>
                  {habit.name}
                </Label>
                <span className="text-sm text-muted-foreground">({habit.type})</span>
              </div>
              <Button variant="destructive" size="sm" onClick={() => deleteHabit(habit.id)}>
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