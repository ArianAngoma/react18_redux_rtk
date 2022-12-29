import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk,
  createSelector,
  createDraftSafeSelector,
  createEntityAdapter, EntityState
} from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { sub } from 'date-fns'

import { RootState } from '../../app/store'
import { apiSlice } from '../api/apiSlice'

// const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

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

/* export interface PostState {
  // posts: Post[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
  count: number
} */

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState: EntityState<Post> = postsAdapter.getInitialState()

/* export const fetchPosts = createAsyncThunk<
  PostResponse[],
  void,
  { rejectValue: string }
>('posts/fetchPosts', async (_, { rejectWithValue }) => {
    try {

      const response = await axios.get<PostResponse[]>(POSTS_URL)
      return response.data

    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue('Something went wrong')
    }
  },
  {
    condition: (_, { getState }) => {
      const { posts } = getState() as RootState
      if (posts.status === 'succeeded' || posts.status === 'loading') {
        return false
      }
    }
  }
)

export const addNewPost = createAsyncThunk<
  PostResponse,
  Omit<Post, 'id' | 'date' | 'reactions'>,
  { rejectValue: string }
>('posts/addNewPost', async (initialPost, { rejectWithValue }) => {
    try {
      const response = await axios.post<PostResponse>(POSTS_URL, { ...initialPost })
      return response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue('Something went wrong')
    }
  }
)

export const updatePost = createAsyncThunk<
  PostResponse,
  Partial<PostResponse>,
  { rejectValue: string }
>('posts/updatePost', async (updatedPost, { rejectWithValue }) => {
    try {
      const response = await axios.put<PostResponse>(`${POSTS_URL}/${updatedPost.id}`, updatedPost)
      return response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue('Something went wrong')
    }
  }
)

export const deletePost = createAsyncThunk<
  number,
  Pick<Post, 'id'>,
  { rejectValue: string }
>('posts/deletePost', async ({ id }, { rejectWithValue }) => {
    try {
      await axios.delete(`${POSTS_URL}/${id}`)
      return id
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue('Something went wrong')
    }
  }
) */

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

/* const postsSlice = createSlice({

  name: 'posts',

  initialState,

  reducers: {
    /!* postAdded: {
      reducer (state, action: PayloadAction<Post>) {
        state.posts.push(action.payload)
      },
      prepare ({
        title,
        body,
        userId
      }: Omit<Post, 'id' | 'date' | 'reactions'>) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
            }
          }
        }
      }
    }, *!/
    reactionAdded (state, action: PayloadAction<{ postId: string | number; reaction: keyof Reaction }>) {

      const {
        postId,
        reaction
      } = action.payload

      // const existingPost = state.posts.find(post => post.id === postId)

      const existingPost = state.entities[postId]

      if (existingPost) {
        existingPost.reactions[reaction]++
      }

    },

    increaseCount (state) {
      state.count++
    }
  },

  extraReducers: builder => {
    // The payload is what the async thunk returns
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded'

      let min = 1

      const loadedPosts: Post[] = action.payload.map(post => {
        return {
          ...post,
          date: sub(new Date(), { minutes: min++ }).toISOString(),
          reactions: {
            thumbUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
          }
        }
      })

      // state.posts = state.posts.concat(loadedPosts)
      postsAdapter.upsertMany(state, loadedPosts)
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      // In this case, we want to display an error message if the fetch fails (e.g. due to a network error) with a `try/catch` block
      state.status = 'failed'
      state.error = action.payload
    })
    builder.addCase(addNewPost.fulfilled, (state, action) => {

      /!* state.posts.push({
        ...action.payload,
        date: new Date().toISOString(),
        reactions: {
          thumbUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0
        }
      }) *!/

      postsAdapter.addOne(state, {
        ...action.payload,
        date: new Date().toISOString(),
        reactions: {
          thumbUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0
        }
      })

    })
    builder.addCase(updatePost.fulfilled, (state, action) => {

      if (!action.payload.id) return

      const { id } = action.payload

      /!* const existingPost = state.posts.find(post => post.id === id)

      if (existingPost) {
        existingPost.title = action.payload.title
        existingPost.body = action.payload.body
        existingPost.date = new Date().toISOString()
      } *!/

      postsAdapter.updateOne(state, {
        id,
        changes: {
          ...action.payload,
          date: new Date().toISOString()
        }
      })

    })
    builder.addCase(deletePost.fulfilled, (state, action) => {

      if (!action.payload) return

      // state.posts = state.posts.filter(post => post.id !== action.payload)

      postsAdapter.removeOne(state, action.payload)

    })

  }

}) */

/*
* This is the best way to obtain some state since we only get the specific state we want, and we don't worry if another state changes and will render the component.
*  */
// export const selectAllPosts = (state: RootState) => state.posts.posts

export const {
  useGetPostsQuery
} = extendedApiSlice

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts)

export const getPostsStatus = (state: RootState) => state.posts.status

export const getPostsError = (state: RootState) => state.posts.error

// export const selectPostById = (state: RootState, postId: number) => state.posts.posts.find(post => post.id === postId)

export const selectPostsByUser = createDraftSafeSelector(
  [
    selectAllPosts,
    (state: RootState, userId: number) => userId,
  ],
  (posts, userId) => posts.filter(post => post.userId === userId)
)

export const {
  // postAdded,
  reactionAdded,
  increaseCount
} = postsSlice.actions

export default postsSlice.reducer
