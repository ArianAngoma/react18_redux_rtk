import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Todo {
  completed: boolean
  id: number
  title: string
  userId: number
}

type TodosResponse = Todo[]

export const todosApi = createApi({
  reducerPath: 'todos',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),

  endpoints: (builder) => ({

    getTodos: builder.query<TodosResponse, void>({
      query: () => '/todos',
    }),

    getTodoById: builder.query<Todo, number>({
      query: (id) => `/todos/${id}`,
    })

  })
})

export const {
  useGetTodosQuery,
  useGetTodoByIdQuery
} = todosApi


