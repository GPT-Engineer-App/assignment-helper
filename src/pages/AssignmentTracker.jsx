import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Confetti } from "@/components/ui/confetti";
import { EncouragingMessage } from "@/components/EncouragingMessage";

const subjectColors = {
  Math: "bg-blue-200",
  Science: "bg-green-200",
  History: "bg-yellow-200",
  Literature: "bg-purple-200",
  Other: "bg-gray-200",
};

const AssignmentTracker = () => {
  const [assignments, setAssignments] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAssignment = { subject, description, dueDate, priority, completed: false };
    setAssignments([...assignments, newAssignment]);
    // Reset form
    setSubject("");
    setDescription("");
    setDueDate(new Date());
    setPriority("");
  };

  const handleComplete = (index) => {
    const updatedAssignments = assignments.map((assignment, i) => 
      i === index ? { ...assignment, completed: true } : assignment
    );
    setAssignments(updatedAssignments);
    setShowConfetti(true);
    setShowEncouragement(true);
    setTimeout(() => {
      setShowConfetti(false);
      setShowEncouragement(false);
    }, 5000);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Assignment Tracker</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(subjectColors).map((subj) => (
                <SelectItem key={subj} value={subj}>
                  {subj}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Due Date</Label>
          <Calendar
            mode="single"
            selected={dueDate}
            onSelect={setDueDate}
            className="rounded-md border"
          />
        </div>
        <div>
          <Label htmlFor="priority">Priority</Label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Add Assignment</Button>
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Upcoming Assignments</h2>
        <div className="space-y-2">
          {assignments.map((assignment, index) => (
            <div
              key={index}
              className={`p-4 rounded-md ${subjectColors[assignment.subject] || subjectColors.Other} ${
                assignment.completed ? 'opacity-50' : ''
              }`}
            >
              <h3 className="font-semibold">{assignment.subject}</h3>
              <p>{assignment.description}</p>
              <p>Due: {format(assignment.dueDate, "PP")}</p>
              <p>Priority: {assignment.priority}</p>
              {!assignment.completed && (
                <Button onClick={() => handleComplete(index)} className="mt-2">
                  Mark as Completed
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      {showConfetti && <Confetti />}
      {showEncouragement && <EncouragingMessage />}
    </div>
  );
};

export default AssignmentTracker;