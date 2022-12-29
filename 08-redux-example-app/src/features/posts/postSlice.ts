import {
  createDraftSafeSelector,
  createEntityAdapter,
  EntityState
} from '@reduxjs/toolkit'
import { sub } from 'date-fns'

import { RootState } from '../../app/store'
import { apiSlice } from '../api/apiSlice'

export interface Reaction {
  thumbUp: number
  wow: number
  heart: number
  rocket: number
  coffee: number
}

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  date: string
  reactions: Reaction
}

type PostResponse = Omit<Post, 'reactions' | 'date'> & {
  date?: string
  reactions?: Reaction
}

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState: EntityState<Post> = postsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getPosts: builder.query<EntityState<Post>, void>({

      query: () => '/posts',

      transformResponse: (response: PostResponse[]) => {

        let min = 1

        const loadedPost: Post[] = response.map(post => ({
          ...post,
          date: post.date || sub(new Date(), { minutes: min++ }).toISOString(),
          reactions: post.reactions || {
            thumbUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
          }
        }))

        return postsAdapter.setAll(initialState, loadedPost)

      },

      providesTags: (result, error, arg) =>
        result
          ? [...result.ids.map(id => ({
            type: 'Post' as const,
            id
          })), {
            type: 'Post',
            id: 'LIST'
          }]
          : [{
            type: 'Post',
            id: 'LIST'
          }]

    })
  })
})

export const {
  useGetPostsQuery
} = extendedApiSlice

// Returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select()

// Creates memoized selector
const selectPostsData = createDraftSafeSelector(
  [selectPostsResult],
  postsResult => postsResult.data // normalized state object with ids and entities
)

// getSelectors creates these selectors, and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => selectPostsData(state) ?? initialState)
