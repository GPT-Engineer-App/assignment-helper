import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';

const VoiceInput = ({ onVoiceInput }) => {
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
      if (transcript) {
        onVoiceInput(transcript);
      }
      resetTranscript();
    } else {
      SpeechRecognition.startListening({ continuous: true });
      setIsListening(true);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button onClick={handleListening} variant="outline">
        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </Button>
      {isListening && <span className="text-sm text-muted-foreground">Listening...</span>}
    </div>
  );
};

export default VoiceInput;