import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Todo {
  userId: number
  id: number
  title: string
  description: string
  completed: boolean
}

export const apiSlice = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3001`,
  }),

  endpoints: (builder) => ({

    getTodos: builder.query<Todo[], void>({
      query: () => `/todos`,
    }),

  })
})

export const { useGetTodosQuery } = apiSlice
