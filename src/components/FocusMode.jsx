import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const FocusMode = ({ children, onExit }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enterFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
    onExit();
  };

  return (
    <div className={`bg-background text-foreground min-h-screen ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="p-4">
        <Button variant="ghost" size="icon" onClick={exitFullscreen} className="absolute top-4 right-4">
          <X className="h-4 w-4" />
        </Button>
        {!isFullscreen && (
          <Button onClick={enterFullscreen} className="mb-4">
            Enter Full Screen
          </Button>
        )}
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FocusMode;