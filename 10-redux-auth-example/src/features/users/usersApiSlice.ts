import { apiSlice } from '../../app/api/apiSlice'

interface User {
  id: number
  username: string
}

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      keepUnusedDataFor: 5
    })
  })
})

export const {
  useGetUsersQuery
} = usersApiSlice
