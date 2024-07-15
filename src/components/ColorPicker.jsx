import React from 'react';
import { Input } from "@/components/ui/input";

const ColorPicker = ({ color, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 p-0 border-none"
      />
      <span>{color}</span>
    </div>
  );
};

export default ColorPicker;