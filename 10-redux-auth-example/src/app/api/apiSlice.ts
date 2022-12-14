import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { logOut, setCredentials } from '../../features/auth/authSlice'
import { RootState } from '../store'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3500',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 403) {

    // Send refresh token to get new access token
    const refreshTokenResult = await baseQuery({
        url: '/refresh',
        method: 'GET'
    }, api, extraOptions)
    console.log('refreshTokenResult', refreshTokenResult)

    if (refreshTokenResult.data) {
      const user = (api.getState() as RootState).auth.user

      // Store the new token
      api.dispatch(setCredentials({
        // @ts-ignore
        token: refreshTokenResult.data.accessToken,
        user,
      }))

      // Retry the original query with the new token
      result = await baseQuery(args, api, extraOptions)

    } else {
      api.dispatch(logOut())
    }

  }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({})
})
