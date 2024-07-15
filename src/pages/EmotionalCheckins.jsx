import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const moods = ["😄 Happy", "😊 Content", "😐 Neutral", "😔 Sad", "😠 Angry"];
const productivityLevels = ["High", "Medium", "Low"];

const EmotionalCheckins = () => {
  const [checkins, setCheckins] = useState([]);
  const [currentMood, setCurrentMood] = useState("");
  const [currentProductivity, setCurrentProductivity] = useState("");

  useEffect(() => {
    // Load checkins from local storage
    const savedCheckins = localStorage.getItem("emotionalCheckins");
    if (savedCheckins) {
      setCheckins(JSON.parse(savedCheckins));
    }
  }, []);

  useEffect(() => {
    // Save checkins to local storage
    localStorage.setItem("emotionalCheckins", JSON.stringify(checkins));
  }, [checkins]);

  const addCheckin = () => {
    if (currentMood && currentProductivity) {
      const newCheckin = {
        mood: currentMood,
        productivity: currentProductivity,
        timestamp: new Date().toISOString(),
      };
      setCheckins([...checkins, newCheckin]);
      setCurrentMood("");
      setCurrentProductivity("");
    }
  };

  const getMoodProductivityCorrelation = () => {
    const correlation = {};
    checkins.forEach((checkin) => {
      if (!correlation[checkin.mood]) {
        correlation[checkin.mood] = { High: 0, Medium: 0, Low: 0 };
      }
      correlation[checkin.mood][checkin.productivity]++;
    });
    return correlation;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Emotional Check-ins</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>How are you feeling?</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={currentMood} onValueChange={setCurrentMood} className="mb-4">
            {moods.map((mood) => (
              <div key={mood} className="flex items-center space-x-2">
                <RadioGroupItem value={mood} id={mood} />
                <Label htmlFor={mood}>{mood}</Label>
              </div>
            ))}
          </RadioGroup>
          <Select value={currentProductivity} onValueChange={setCurrentProductivity}>
            <SelectTrigger>
              <SelectValue placeholder="Select productivity level" />
            </SelectTrigger>
            <SelectContent>
              {productivityLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={addCheckin} className="mt-4">
            Log Mood and Productivity
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Mood-Productivity Correlation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(getMoodProductivityCorrelation()).map(([mood, productivity]) => (
              <Card key={mood}>
                <CardHeader>
                  <CardTitle>{mood}</CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.entries(productivity).map(([level, count]) => (
                    <div key={level} className="flex justify-between">
                      <span>{level}:</span>
                      <span>{count}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="mt-4 space-y-4">
        <h2 className="text-xl font-semibold">Recent Check-ins</h2>
        {checkins.slice(-5).reverse().map((checkin, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <p className="font-semibold">{checkin.mood}</p>
              <p>Productivity: {checkin.productivity}</p>
              <p className="text-sm text-gray-500">{new Date(checkin.timestamp).toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmotionalCheckins;