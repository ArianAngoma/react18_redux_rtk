import { apiSlice } from '../../app/api/apiSlice'

interface AuthResponse {
  accessToken: string
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<AuthResponse, { user: string, pwd: string }>({
      query: credentials => ({
        url: '/auth',
        method: 'POST',
        body: credentials
      })
    })
  })
})

export const {
  useLoginMutation
} = authApiSlice
