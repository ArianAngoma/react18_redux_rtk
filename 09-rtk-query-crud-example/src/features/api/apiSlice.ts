import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit'

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
      query: () => `/todsos`,
    }),

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

export const { useGetTodosQuery } = apiSlice
