import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit'

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export const apiSlice = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3001`,
  }),

  tagTypes: ['Todos'],

  endpoints: (builder) => ({

    getTodos: builder.query<Todo[], void>({
      query: () => `/todos`,
      providesTags: ['Todos'],
    }),

    addTodo: builder.mutation<Todo, Omit<Todo, 'id'>>({
      query: (body) => ({
        url: `/todos`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Todos'],
    }),

    updateTodo: builder.mutation<Todo, Todo>({
      query: (body) => ({
        url: `/todos/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Todos'],
    }),

    deleteTodo: builder.mutation<Todo, Pick<Todo, 'id'>>({
      query: (body) => ({
        url: `/todos/${body.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'],
    })

  })
})

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    console.log('We got a rejected action!')
    console.log({
      title: 'Async error!',
      message: action.error.data.message
    })
  }

  return next(action)
}

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = apiSlice
