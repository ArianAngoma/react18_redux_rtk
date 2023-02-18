import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi, 
  fetchBaseQuery 
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

import { 
  AuthSuccessResponse,
  RootState,
  onLogoutReducer,
  onSetCredentialsReducer 
} from '../store'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token

    if (token) {
      headers.set('x-token', `${token}`)
    }

    return headers
  }
})

/* const mutex = new Mutex()

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {

  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {

    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {

        const refreshResult = await baseQuery({
          url: '/auth/renew-token',
          method: 'GET'
        }, api, extraOptions)
    
        if (refreshResult.data) {
    
          const { uid, name, token } = refreshResult.data as AuthSuccessResponse
    
          api.dispatch(onSetCredentialsReducer({
            user: {
              uid,
              name
            },
            token
          }))
    
          result = await baseQuery(args, api, extraOptions)
    
        } else {
          api.dispatch(onLogoutReducer())
        }

      } finally {
        release()
      }

    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }

  }

  return result

} */

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: ['Event', 'User'],
  endpoints: () => ({})
})