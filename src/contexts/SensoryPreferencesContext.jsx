import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase';

export const SensoryPreferencesContext = createContext();

export const SensoryPreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    background: 'default',
    font: 'default',
    layout: 'default',
  });

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching preferences:', error);
    } else if (data) {
      setPreferences(data);
    }
  };

  const updatePreferences = async (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));

    const { error } = await supabase
      .from('user_preferences')
      .upsert({ [key]: value }, { onConflict: 'user_id' });

    if (error) {
      console.error('Error updating preferences:', error);
    }
  };

  return (
    <SensoryPreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </SensoryPreferencesContext.Provider>
  );
};