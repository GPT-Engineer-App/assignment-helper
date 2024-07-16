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

/* supabase integration types

### blocked_sites

| name       | type      | format | required |
|------------|-----------|--------|----------|
| id         | uuid      | string | true     |
| user_id    | uuid      | string | false    |
| url        | text      | string | false    |
| created_at | timestamp | string | false    |

### user_preferences

| name             | type      | format | required |
|------------------|-----------|--------|----------|
| id               | uuid      | string | true     |
| user_id          | uuid      | string | true     |
| preference_name  | text      | string | true     |
| preference_value | jsonb     | object | false    |
| created_at       | timestamp | string | true     |
| updated_at       | timestamp | string | true     |

### tasks

| name        | type      | format | required |
|-------------|-----------|--------|----------|
| id          | uuid      | string | true     |
| user_id     | uuid      | string | false    |
| title       | text      | string | false    |
| description | text      | string | false    |
| parent_id   | uuid      | string | false    |
| created_at  | timestamp | string | false    |
| updated_at  | timestamp | string | false    |
| color       | text      | string | false    |

### mood_logs

| name        | type      | format  | required |
|-------------|-----------|---------|----------|
| id          | uuid      | string  | true     |
| user_id     | uuid      | string  | false    |
| mood_score  | integer   | number  | false    |
| notes       | text      | string  | false    |
| logged_at   | timestamp | string  | false    |

### habit_logs

| name         | type      | format | required |
|--------------|-----------|--------|----------|
| id           | uuid      | string | true     |
| habit_id     | uuid      | string | false    |
| completed_at | timestamp | string | false    |

### habits

| name       | type      | format | required |
|------------|-----------|--------|----------|
| id         | uuid      | string | true     |
| user_id    | uuid      | string | false    |
| name       | text      | string | false    |
| frequency  | text      | string | false    |
| created_at | timestamp | string | false    |

### encouragement_messages

| name     | type | format | required |
|----------|------|--------|----------|
| id       | uuid | string | true     |
| message  | text | string | false    |
| category | text | string | false    |

### user_progress

| name                | type      | format | required |
|---------------------|-----------|--------|----------|
| id                  | uuid      | string | true     |
| user_id             | uuid      | string | false    |
| points              | integer   | number | false    |
| streak              | integer   | number | false    |
| last_activity_date  | date      | string | false    |
| created_at          | timestamp | string | false    |
| updated_at          | timestamp | string | false    |

### users

| name       | type      | format | required |
|------------|-----------|--------|----------|
| id         | uuid      | string | true     |
| email      | text      | string | true     |
| created_at | timestamp | string | true     |

### fidget_usage

| name       | type      | format | required |
|------------|-----------|--------|----------|
| id         | uuid      | string | true     |
| user_id    | uuid      | string | false    |
| game_name  | text      | string | false    |
| duration   | integer   | number | false    |
| played_at  | timestamp | string | false    |

*/

// Blocked Sites
export const useBlockedSites = () => useQuery({
    queryKey: ['blocked_sites'],
    queryFn: () => fromSupabase(supabase.from('blocked_sites').select('*'))
});

export const useAddBlockedSite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newSite) => fromSupabase(supabase.from('blocked_sites').insert([newSite])),
        onSuccess: () => queryClient.invalidateQueries(['blocked_sites'])
    });
};

export const useUpdateBlockedSite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('blocked_sites').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['blocked_sites'])
    });
};

export const useDeleteBlockedSite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('blocked_sites').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['blocked_sites'])
    });
};

// User Preferences
export const useUserPreferences = () => useQuery({
    queryKey: ['user_preferences'],
    queryFn: () => fromSupabase(supabase.from('user_preferences').select('*'))
});

export const useAddUserPreference = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newPreference) => fromSupabase(supabase.from('user_preferences').insert([newPreference])),
        onSuccess: () => queryClient.invalidateQueries(['user_preferences'])
    });
};

export const useUpdateUserPreference = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('user_preferences').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['user_preferences'])
    });
};

export const useDeleteUserPreference = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('user_preferences').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['user_preferences'])
    });
};

// Tasks
export const useTasks = () => useQuery({
    queryKey: ['tasks'],
    queryFn: () => fromSupabase(supabase.from('tasks').select('*'))
});

export const useAddTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTask) => fromSupabase(supabase.from('tasks').insert([newTask])),
        onSuccess: () => queryClient.invalidateQueries(['tasks'])
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('tasks').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['tasks'])
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('tasks').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['tasks'])
    });
};

// Mood Logs
export const useMoodLogs = () => useQuery({
    queryKey: ['mood_logs'],
    queryFn: () => fromSupabase(supabase.from('mood_logs').select('*'))
});

export const useAddMoodLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newLog) => fromSupabase(supabase.from('mood_logs').insert([newLog])),
        onSuccess: () => queryClient.invalidateQueries(['mood_logs'])
    });
};

export const useUpdateMoodLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('mood_logs').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['mood_logs'])
    });
};

export const useDeleteMoodLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('mood_logs').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['mood_logs'])
    });
};

// Habit Logs
export const useHabitLogs = () => useQuery({
    queryKey: ['habit_logs'],
    queryFn: () => fromSupabase(supabase.from('habit_logs').select('*'))
});

export const useAddHabitLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newLog) => fromSupabase(supabase.from('habit_logs').insert([newLog])),
        onSuccess: () => queryClient.invalidateQueries(['habit_logs'])
    });
};

export const useUpdateHabitLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('habit_logs').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['habit_logs'])
    });
};

export const useDeleteHabitLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('habit_logs').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['habit_logs'])
    });
};

// Habits
export const useHabits = () => useQuery({
    queryKey: ['habits'],
    queryFn: () => fromSupabase(supabase.from('habits').select('*'))
});

export const useAddHabit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newHabit) => fromSupabase(supabase.from('habits').insert([newHabit])),
        onSuccess: () => queryClient.invalidateQueries(['habits'])
    });
};

export const useUpdateHabit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('habits').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['habits'])
    });
};

export const useDeleteHabit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('habits').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['habits'])
    });
};

// Encouragement Messages
export const useEncouragementMessages = () => useQuery({
    queryKey: ['encouragement_messages'],
    queryFn: () => fromSupabase(supabase.from('encouragement_messages').select('*'))
});

export const useAddEncouragementMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newMessage) => fromSupabase(supabase.from('encouragement_messages').insert([newMessage])),
        onSuccess: () => queryClient.invalidateQueries(['encouragement_messages'])
    });
};

export const useUpdateEncouragementMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('encouragement_messages').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['encouragement_messages'])
    });
};

export const useDeleteEncouragementMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('encouragement_messages').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['encouragement_messages'])
    });
};

// User Progress
export const useUserProgress = () => useQuery({
    queryKey: ['user_progress'],
    queryFn: () => fromSupabase(supabase.from('user_progress').select('*'))
});

export const useAddUserProgress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProgress) => fromSupabase(supabase.from('user_progress').insert([newProgress])),
        onSuccess: () => queryClient.invalidateQueries(['user_progress'])
    });
};

export const useUpdateUserProgress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('user_progress').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['user_progress'])
    });
};

export const useDeleteUserProgress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('user_progress').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['user_progress'])
    });
};

// Users
export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => fromSupabase(supabase.from('users').select('*'))
});

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('users').insert([newUser])),
        onSuccess: () => queryClient.invalidateQueries(['users'])
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('users').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['users'])
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('users').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['users'])
    });
};

// Fidget Usage
export const useFidgetUsage = () => useQuery({
    queryKey: ['fidget_usage'],
    queryFn: () => fromSupabase(supabase.from('fidget_usage').select('*'))
});

export const useAddFidgetUsage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUsage) => fromSupabase(supabase.from('fidget_usage').insert([newUsage])),
        onSuccess: () => queryClient.invalidateQueries(['fidget_usage'])
    });
};

export const useUpdateFidgetUsage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('fidget_usage').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['fidget_usage'])
    });
};

export const useDeleteFidgetUsage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('fidget_usage').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['fidget_usage'])
    });
};