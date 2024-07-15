import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const moods = ["😄 Happy", "😊 Content", "😐 Neutral", "😔 Sad", "😠 Angry"];

const EmotionalCheckins = () => {
  const [checkins, setCheckins] = useState([]);
  const [currentMood, setCurrentMood] = useState("");

  const addCheckin = () => {
    if (currentMood) {
      const newCheckin = {
        mood: currentMood,
        timestamp: new Date().toLocaleString(),
      };
      setCheckins([...checkins, newCheckin]);
      setCurrentMood("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Emotional Check-ins</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>How are you feeling?</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={currentMood} onValueChange={setCurrentMood}>
            {moods.map((mood) => (
              <div key={mood} className="flex items-center space-x-2">
                <RadioGroupItem value={mood} id={mood} />
                <Label htmlFor={mood}>{mood}</Label>
              </div>
            ))}
          </RadioGroup>
          <Button onClick={addCheckin} className="mt-4">
            Log Mood
          </Button>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {checkins.map((checkin, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <p className="font-semibold">{checkin.mood}</p>
              <p className="text-sm text-gray-500">{checkin.timestamp}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmotionalCheckins;