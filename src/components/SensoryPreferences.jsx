import React, { useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SensoryPreferencesContext } from '@/contexts/SensoryPreferencesContext';

const SensoryPreferences = () => {
  const { preferences, updatePreferences } = useContext(SensoryPreferencesContext);

  const backgrounds = ['default', 'nature', 'abstract', 'minimal'];
  const fonts = ['default', 'serif', 'sans-serif', 'monospace'];
  const layouts = ['default', 'compact', 'spacious', 'grid'];

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="background">Background</Label>
        <Select
          value={preferences.background}
          onValueChange={(value) => updatePreferences('background', value)}
        >
          <SelectTrigger id="background">
            <SelectValue placeholder="Select background" />
          </SelectTrigger>
          <SelectContent>
            {backgrounds.map((bg) => (
              <SelectItem key={bg} value={bg}>
                {bg.charAt(0).toUpperCase() + bg.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="font">Font</Label>
        <Select
          value={preferences.font}
          onValueChange={(value) => updatePreferences('font', value)}
        >
          <SelectTrigger id="font">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {fonts.map((font) => (
              <SelectItem key={font} value={font}>
                {font.charAt(0).toUpperCase() + font.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="layout">Layout</Label>
        <Select
          value={preferences.layout}
          onValueChange={(value) => updatePreferences('layout', value)}
        >
          <SelectTrigger id="layout">
            <SelectValue placeholder="Select layout" />
          </SelectTrigger>
          <SelectContent>
            {layouts.map((layout) => (
              <SelectItem key={layout} value={layout}>
                {layout.charAt(0).toUpperCase() + layout.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={() => console.log('Preferences saved:', preferences)}>
        Save Preferences
      </Button>
    </div>
  );
};

export default SensoryPreferences;