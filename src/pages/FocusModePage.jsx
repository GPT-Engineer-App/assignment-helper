import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import FocusMode from '@/components/FocusMode';

const FocusModePage = () => {
  const [isFocusModeActive, setIsFocusModeActive] = useState(false);

  const activateFocusMode = () => {
    setIsFocusModeActive(true);
  };

  const deactivateFocusMode = () => {
    setIsFocusModeActive(false);
  };

  if (isFocusModeActive) {
    return (
      <FocusMode onExit={deactivateFocusMode}>
        <h1 className="text-2xl font-bold mb-4">Focus Mode</h1>
        <p className="mb-4">You are now in focus mode. Stay concentrated on your task!</p>
        {/* Add your focused task content here */}
      </FocusMode>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Focus Mode</h1>
      <p className="mb-4">Enter focus mode to minimize distractions and concentrate on your task.</p>
      <Button onClick={activateFocusMode}>Activate Focus Mode</Button>
    </div>
  );
};

export default FocusModePage;