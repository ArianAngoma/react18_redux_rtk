import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@reduxjs/toolkit/dist/query/core/apiState'
import { logOut, setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3500',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  }
})

const baseQueryWithReAuth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 403) {

    console.log('Re-authenticating...')

    // Send refresh token to get new access token
    const refreshTokenResult = await baseQuery('/refresh', api, extraOptions)
    console.log('refreshTokenResult', refreshTokenResult)

    if (refreshTokenResult.data) {
      const user = (api.getState() as RootState).auth.user

      // Store the new token

      api.dispatch(setCredentials({
        ...refreshTokenResult.data,
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
