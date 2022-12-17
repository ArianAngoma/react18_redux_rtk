import { createSlice, PayloadAction, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { sub } from 'date-fns'

import { RootState } from '../../app/store'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

export interface Reaction {
  thumbUp: number
  wow: number
  heart: number
  rocket: number
  coffee: number
}

export interface Post {
  id: number | string
  title: string
  body: string
  userId?: string | number
  date: string
  reactions: Reaction
}

export interface PostState {
  posts: Post[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined

}

const initialState: PostState = {
  posts: [],
  status: 'idle',
  error: undefined
}

export const fetchPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>('posts/fetchPosts', async (_, { rejectWithValue }) => {
    try {

      const response = await axios.get(POSTS_URL)
      return response.data

    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.message)
      }
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
  Post,
  Omit<Post, 'id' | 'date' | 'reactions'>,
  { rejectValue: string }
>('posts/addNewPost', async (initialPost, { rejectWithValue }) => {
    try {
      const response = await axios.post(POSTS_URL, { ...initialPost })
      return response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.message)
      }
    }
  }
)

const postsSlice = createSlice({

  name: 'posts',

  initialState,

  reducers: {
    postAdded: {
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
    },
    reactionAdded (state, action: PayloadAction<{ postId: string | number; reaction: keyof Reaction }>) {

      const {
        postId,
        reaction
      } = action.payload

      const existingPost = state.posts.find(post => post.id === postId)

      if (existingPost) {
        existingPost.reactions[reaction]++
      }

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

      const loadedPosts = action.payload.map(post => {
        post.date = sub(new Date(), { minutes: min++ }).toISOString()
        post.reactions = {
          thumbUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0
        }
        return post
      })

      state.posts = state.posts.concat(loadedPosts)
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      // In this case, we want to display an error message if the fetch fails (e.g. due to a network error) with a `try/catch` block
      state.status = 'failed'
      state.error = action.payload
    })
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      action.payload.userId = Number(action.payload.userId)
      action.payload.date = new Date().toISOString()
      action.payload.reactions = {
        thumbUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0
      }
      state.posts.push(action.payload)
    })
  }

})

export const {
  postAdded,
  reactionAdded
} = postsSlice.actions

export default postsSlice.reducer
