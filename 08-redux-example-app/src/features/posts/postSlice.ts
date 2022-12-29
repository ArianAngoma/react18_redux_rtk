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

    }),

    getPostsByUserId: builder.query<EntityState<Post>, number>({

      query: userId => `/posts/?userId=${userId}`,

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
          }))] : [{
            type: 'Post',
            id: 'POSTS_BY_USER_ID'
          }]

    }),

    addNewPost: builder.mutation<Post, Omit<Post, 'id' | 'date' | 'reactions'>>({

      query: initialPost => ({
        url: '/posts',
        method: 'POST',
        body: {
          ...initialPost,
          date: new Date().toISOString(),
          reactions: {
            thumbUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
          }
        }
      }),

      invalidatesTags: [
        {
          type: 'Post',
          id: 'LIST'
        }
      ]

    }),

    updatePost: builder.mutation<Post, Omit<Post, 'date' | 'reactions'>>({

      query: post => ({
        url: `/posts/${post.id}`,
        method: 'PUT',
        body: {
          ...post,
          date: new Date().toISOString(),
        }
      }),

      invalidatesTags: (result, error, arg) => [{
        type: 'Post',
        id: arg.id
      }]

    }),

    deletePost: builder.mutation<Post, Pick<Post, 'id'>>({

      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
        body: {
          id
        }
      }),

      invalidatesTags: (result, error, arg) => [{
        type: 'Post',
        id: arg.id
      }]

    }),

    addReaction: builder.mutation<Post, { postId: number, reactions: Reaction }>({

      query: ({
        postId,
        reactions
      }) => ({
        url: `/posts/${postId}`,
        method: 'PATCH',
        // In a real app, we'd probably need to base this on user ID somehow so that a user can't do the same reaction more than once
        body: { reactions }

      }),

      async onQueryStarted ({
        postId,
        reactions
      }, {
        dispatch,
        queryFulfilled
      }) {
        // `updateQueryData` requires the endpoint name and cache key arguments, so it knows which piece of cache state to update
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData('getPosts', undefined, draft => {
            // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
            const post = draft.entities[postId]
            if (post) post.reactions = reactions
          })
        )

        try {
          await queryFulfilled
        } catch (err) {
          patchResult.undo()
        }
      }

    })

  })
})

export const {
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddReactionMutation
} = extendedApiSlice

// Returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select()

// Creates memoized selector
const selectPostsData = createDraftSafeSelector(
  [selectPostsResult],
  postsResult => postsResult.data // normalized state object with ids and entities
)

export const selectGetPostsIsLoading = createDraftSafeSelector(
  [selectPostsResult],
  postsResult => postsResult.isLoading
)

// getSelectors creates these selectors, and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => selectPostsData(state) ?? initialState)
