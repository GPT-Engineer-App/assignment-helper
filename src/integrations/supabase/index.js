import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

// User Progress
export const useUserProgress = () => useQuery({
    queryKey: ['user_progress'],
    queryFn: () => fromSupabase(supabase.from('user_progress').select('*').single())
});

export const useUpdateUserProgress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updates) => fromSupabase(supabase.from('user_progress').upsert(updates)),
        onSuccess: () => queryClient.invalidateQueries(['user_progress'])
    });
};

// User Preferences
export const useUserPreferences = () => useQuery({
    queryKey: ['user_preferences'],
    queryFn: () => fromSupabase(supabase.from('user_preferences').select('*').single())
});

export const useUpdateUserPreferences = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updates) => fromSupabase(supabase.from('user_preferences').upsert(updates)),
        onSuccess: () => queryClient.invalidateQueries(['user_preferences'])
    });
};