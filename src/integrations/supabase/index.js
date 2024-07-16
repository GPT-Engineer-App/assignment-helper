import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

// ... (previous code remains unchanged)

// Leaderboard
export const useLeaderboard = () => useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => fromSupabase(supabase.from('user_progress').select('id, username, points, streak').order('points', { ascending: false }).limit(10))
});

// Challenges
export const useChallenges = () => useQuery({
    queryKey: ['challenges'],
    queryFn: () => fromSupabase(supabase.from('challenges').select('*'))
});

// ... (rest of the previous code remains unchanged)