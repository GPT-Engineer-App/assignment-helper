import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

const VoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleListen = () => {
    if (!isListening) {
      SpeechRecognition.startListening({ continuous: true });
      setIsListening(true);
    } else {
      SpeechRecognition.stopListening();
      setIsListening(false);
      // Here you would process the transcript and add tasks or set reminders
      console.log("Processing voice command:", transcript);
      resetTranscript();
    }
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Your browser doesn't support speech recognition.</div>;
  }

  return (
    <div className="mt-4">
      <Button onClick={handleListen} className="flex items-center space-x-2">
        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        <span>{isListening ? 'Stop Listening' : 'Start Voice Command'}</span>
      </Button>
      {isListening && <p className="mt-2">Listening...</p>}
      {transcript && <p className="mt-2">Transcript: {transcript}</p>}
    </div>
  );
};

export default VoiceCommands;