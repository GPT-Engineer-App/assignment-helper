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

/* supabase integration types

### user_preferences

| name             | type                    | format | required |
|------------------|-------------------------|--------|----------|
| id               | uuid                    | string | true     |
| user_id          | uuid                    | string | true     |
| background       | text                    | string | false    |
| font             | text                    | string | false    |
| layout           | text                    | string | false    |
| created_at       | timestamp with time zone| string | true     |
| updated_at       | timestamp with time zone| string | true     |

### user_progress

| name               | type                    | format | required |
|--------------------|-------------------------|--------|----------|
| id                 | uuid                    | string | true     |
| user_id            | uuid                    | string | true     |
| username           | text                    | string | false    |
| points             | integer                 | number | false    |
| streak             | integer                 | number | false    |
| earned_badges      | text[]                  | array  | false    |
| last_activity_date | date                    | string | false    |
| created_at         | timestamp with time zone| string | true     |
| updated_at         | timestamp with time zone| string | true     |

### challenges

| name        | type                    | format | required |
|-------------|-------------------------|--------|----------|
| id          | uuid                    | string | true     |
| name        | text                    | string | true     |
| description | text                    | string | false    |
| goal        | integer                 | number | true     |
| unit        | text                    | string | true     |
| created_at  | timestamp with time zone| string | true     |
| updated_at  | timestamp with time zone| string | true     |

### user_challenges

| name         | type                    | format | required |
|--------------|-------------------------|--------|----------|
| id           | uuid                    | string | true     |
| user_id      | uuid                    | string | true     |
| challenge_id | uuid                    | string | true     |
| progress     | integer                 | number | false    |
| completed    | boolean                 | boolean| false    |
| created_at   | timestamp with time zone| string | true     |
| updated_at   | timestamp with time zone| string | true     |

*/

// User Preferences
export const useUserPreferences = (userId) => useQuery({
    queryKey: ['userPreferences', userId],
    queryFn: () => fromSupabase(supabase.from('user_preferences').select('*').eq('user_id', userId).single()),
});

export const useUpdateUserPreference = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updates }) => fromSupabase(supabase.from('user_preferences').update(updates).eq('id', id)),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['userPreferences', variables.user_id]);
        },
    });
};

// User Progress
export const useUserProgress = (userId) => useQuery({
    queryKey: ['userProgress', userId],
    queryFn: () => fromSupabase(supabase.from('user_progress').select('*').eq('user_id', userId).single()),
});

export const useUpdateUserProgress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updates }) => fromSupabase(supabase.from('user_progress').update(updates).eq('id', id)),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['userProgress', variables.user_id]);
        },
    });
};

// Challenges
export const useChallenges = () => useQuery({
    queryKey: ['challenges'],
    queryFn: () => fromSupabase(supabase.from('challenges').select('*')),
});

export const useChallenge = (id) => useQuery({
    queryKey: ['challenge', id],
    queryFn: () => fromSupabase(supabase.from('challenges').select('*').eq('id', id).single()),
});

export const useCreateChallenge = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newChallenge) => fromSupabase(supabase.from('challenges').insert([newChallenge])),
        onSuccess: () => {
            queryClient.invalidateQueries(['challenges']);
        },
    });
};

export const useUpdateChallenge = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updates }) => fromSupabase(supabase.from('challenges').update(updates).eq('id', id)),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['challenges']);
            queryClient.invalidateQueries(['challenge', variables.id]);
        },
    });
};

export const useDeleteChallenge = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('challenges').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries(['challenges']);
        },
    });
};

// User Challenges
export const useUserChallenges = (userId) => useQuery({
    queryKey: ['userChallenges', userId],
    queryFn: () => fromSupabase(supabase.from('user_challenges').select('*').eq('user_id', userId)),
});

export const useUserChallenge = (id) => useQuery({
    queryKey: ['userChallenge', id],
    queryFn: () => fromSupabase(supabase.from('user_challenges').select('*').eq('id', id).single()),
});

export const useCreateUserChallenge = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUserChallenge) => fromSupabase(supabase.from('user_challenges').insert([newUserChallenge])),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['userChallenges', variables.user_id]);
        },
    });
};

export const useUpdateUserChallenge = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updates }) => fromSupabase(supabase.from('user_challenges').update(updates).eq('id', id)),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['userChallenges', variables.user_id]);
            queryClient.invalidateQueries(['userChallenge', variables.id]);
        },
    });
};

export const useDeleteUserChallenge = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('user_challenges').delete().eq('id', id)),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['userChallenges', variables.user_id]);
        },
    });
};