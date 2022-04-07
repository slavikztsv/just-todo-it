import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBoard } from '../models/interfaces/Board.interface';
import { ITaskList } from '../models/interfaces/TaskList.interface';
import { ITask } from '../models/interfaces/Task.interface';

export const apiService = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3004",
  }),
  tagTypes: ["Board", "TaskList", "Task"],
  endpoints: (builder) => ({
    getBoards: builder.query<IBoard[], void>({
      query: () => "boards",
      providesTags: ["Board"],
    }),
    getBoardById: builder.query<IBoard, string>({
      query: (id) => `boards/${id}`,
      providesTags: ["Board"],
    }),
    addBoard: builder.mutation<IBoard, IBoard>({
      query: (board) => ({
        url: "boards",
        method: "POST",
        body: board,
      }),
      invalidatesTags: ["Board"],
    }),
    updateBoard: builder.mutation<IBoard, Partial<IBoard>>({
      query: ({ id, ...board }) => ({
        url: `boards/${id}`,
        method: "PATCH",
        body: board,
      }),
      invalidatesTags: ["Board"],
    }),
    deleteBoard: builder.mutation<void, string>({
      query: (id) => ({
        url: `boards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Board"],
    }),
    getLists: builder.query<ITaskList[], void>({
      query: () => "lists",
      providesTags: ["TaskList"]
    }),
    getListsByBoardId: builder.query<ITaskList[], string>({
      query: (boardId) => `boards/${boardId}/lists`,
      providesTags: ["TaskList"]
    }),
    getListById: builder.query<ITaskList, string>({
      query: (id) => `lists/${id}`,
      providesTags: ["TaskList"]
    }),
    addList: builder.mutation<ITaskList, ITaskList>({
      query: (list) => ({
        url: "lists",
        method: "POST",
        body: list,
      }),
      invalidatesTags: ["TaskList"]
    }),
    updateList: builder.mutation<ITaskList, Partial<ITaskList>>({
      query: ({ id, ...list }) => ({
        url: `lists/${id}`,
        method: "PATCH",
        body: list,
      }),
      invalidatesTags: ["TaskList"],
    }),
    deleteList: builder.mutation<void, string>({
      query: (id) => ({
        url: `lists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TaskList"],
    }),
    getTasks: builder.query<ITask[], void>({
      query: () => "tasks",
      providesTags: ["Task"]
    }),
    getTasksByBoardId: builder.query<ITask[], string>({
      query: (boardId) => `boards/${boardId}/tasks`,
      providesTags: ["Task"]
    }),
    getTaskById: builder.query<ITask, string>({
      query: (id) => `tasks/${id}`,
      providesTags: ["Task"]
    }),
    addTask: builder.mutation<ITask, ITask>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"]
    }),
    updateTask: builder.mutation<ITask, Partial<ITask>>({
      query: ({ id, ...task }) => ({
        url: `tasks/${id}`,
        method: "PATCH",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),    
  }),
});

export const {
  useGetBoardsQuery,
  useGetBoardByIdQuery,
  useAddBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useGetListsQuery,
  useGetListsByBoardIdQuery,
  useGetListByIdQuery,
  useAddListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
  useGetTasksQuery,
  useGetTasksByBoardIdQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = apiService;