import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Todo {
  completed: boolean
  id: number
  title: string
  userId: number
}

type TodoResponse = Todo[]

export const todosApi = createApi({
  reducerPath: 'todos',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),

  endpoints: (builder) => ({

    getTodos: builder.query<TodoResponse, void>({
      query: () => '/todos',
    })

  })
})

export const { useGetTodosQuery } = todosApi


