import React, { createContext, useState, useEffect } from 'react';
import { useUserPreferences, useUpdateUserPreference } from '@/integrations/supabase';

export const SensoryPreferencesContext = createContext();

export const SensoryPreferencesProvider = ({ children }) => {
  const { data: preferences, isLoading, error } = useUserPreferences();
  const updatePreferenceMutation = useUpdateUserPreference();

  const [localPreferences, setLocalPreferences] = useState({
    background: 'default',
    font: 'default',
    layout: 'default',
  });

  useEffect(() => {
    if (preferences) {
      setLocalPreferences(preferences);
    }
  }, [preferences]);

  const updatePreferences = async (key, value) => {
    setLocalPreferences((prev) => ({ ...prev, [key]: value }));

    try {
      await updatePreferenceMutation.mutateAsync({ [key]: value });
    } catch (error) {
      console.error('Error updating preferences:', error);
      // Revert local state if update fails
      setLocalPreferences((prev) => ({ ...prev, [key]: preferences[key] }));
    }
  };

  return (
    <SensoryPreferencesContext.Provider 
      value={{ 
        preferences: localPreferences, 
        updatePreferences, 
        isLoading, 
        error 
      }}
    >
      {children}
    </SensoryPreferencesContext.Provider>
  );
};