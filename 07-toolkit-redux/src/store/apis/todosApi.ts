import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const todosApi = createApi({
  reducerPath: 'todos',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),

  endpoints: (builder) => ({

    getTodos: builder.query<any, number>({
      query: () => '/todos',
    })

  })
})

export const { useGetTodosQuery } = todosApi


