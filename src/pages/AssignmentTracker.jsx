import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import VoiceInput from "@/components/VoiceInput";

const AssignmentTracker = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement assignment submission logic
    console.log({ subject, description, dueDate, priority });
  };

  const handleVoiceInput = (transcript) => {
    // Simple parsing logic for demonstration
    const lowerTranscript = transcript.toLowerCase();
    if (lowerTranscript.includes("subject")) {
      const subjectMatch = lowerTranscript.match(/subject\s+(.+)/);
      if (subjectMatch) setSubject(subjectMatch[1]);
    }
    if (lowerTranscript.includes("description")) {
      const descriptionMatch = lowerTranscript.match(/description\s+(.+)/);
      if (descriptionMatch) setDescription(descriptionMatch[1]);
    }
    if (lowerTranscript.includes("priority")) {
      if (lowerTranscript.includes("high")) setPriority("high");
      else if (lowerTranscript.includes("medium")) setPriority("medium");
      else if (lowerTranscript.includes("low")) setPriority("low");
    }
    // Note: Due date parsing would require more complex logic and is omitted for simplicity
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Assignment Tracker</h1>
      <VoiceInput onVoiceInput={handleVoiceInput} />
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
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
          <Select onValueChange={setPriority} value={priority}>
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
        {/* TODO: Implement calendar view of assignments */}
        <p>Calendar view will be implemented here</p>
      </div>
    </div>
  );
};

export default AssignmentTracker;