import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### event

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| name       | text        | string | true     |
| created_at | timestamptz | string | true     |
| date       | date        | string | true     |

### user_preferences

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | uuid        | string | true     |
| user_id    | uuid        | string | true     |
| background | text        | string | false    |
| font       | text        | string | false    |
| layout     | text        | string | false    |
| created_at | timestamptz | string | true     |
| updated_at | timestamptz | string | true     |

*/

// Hooks for the event table
export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => fromSupabase(supabase.from('event').select('*'))
});

export const useEvent = (id) => useQuery({
    queryKey: ['event', id],
    queryFn: () => fromSupabase(supabase.from('event').select('*').eq('id', id).single())
});

export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => fromSupabase(supabase.from('event').insert([newEvent])),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('event').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('event').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

// Hooks for the user_preferences table
export const useUserPreferences = () => useQuery({
    queryKey: ['userPreferences'],
    queryFn: () => fromSupabase(supabase.from('user_preferences').select('*').single())
});

export const useUpdateUserPreferences = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updateData) => fromSupabase(supabase.from('user_preferences').upsert(updateData)),
        onSuccess: () => {
            queryClient.invalidateQueries('userPreferences');
        },
    });
};