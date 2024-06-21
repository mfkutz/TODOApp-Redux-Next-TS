import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
type Task = {
    _id?: string | undefined;
    title: string;
    description: string;
    completed?: boolean;
};

export const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://master.d1tal2nsim9bh3.amplifyapp.com/api/" }),
    tagTypes: ["Task"],
    endpoints: (build) => ({
        getTasks: build.query<Task[], void>({
            query: () => "tasks",
            providesTags: ["Task"],
        }),
        addTask: build.mutation<Task, Task>({
            query: (task) => ({
                url: "tasks",
                method: "POST",
                body: task,
            }),
            invalidatesTags: ["Task"],
        }),
        completeTask: build.mutation<void, {id: string, completed: boolean}>({
            query: ({id,completed}) => ({
                url: `tasks/${id}`,
                method: "PUT",
                body:{completed }
            }),
            invalidatesTags: ["Task"],
        }),

        deleteTask: build.mutation<void, string>({
            query: (id) => ({
                url: `tasks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Task"],
        })
    }),             
});

export const { useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation, useCompleteTaskMutation } = taskApi