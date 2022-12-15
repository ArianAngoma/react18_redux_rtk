import { createSlice, PayloadAction, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { sub } from 'date-fns'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

export interface Reaction {
  thumbUp: number
  wow: number
  heart: number
  rocket: number
  coffee: number
}

export interface Post {
  id: string
  title: string
  content: string
  userId?: string
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
  { rejectValue: AxiosError }
>('posts/fetchPosts', async (_, { rejectWithValue }) => {
    try {

      const response = await axios.get(POSTS_URL)
      return response.data

    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err)
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
        content,
        userId
      }: Omit<Post, 'id' | 'date' | 'reactions'>) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
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
    reactionAdded (state, action: PayloadAction<{ postId: string; reaction: keyof Reaction }>) {

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
      state.status = 'failed'
      state.error = action.error.message
    })
  }

})

export const {
  postAdded,
  reactionAdded
} = postsSlice.actions

export default postsSlice.reducer
