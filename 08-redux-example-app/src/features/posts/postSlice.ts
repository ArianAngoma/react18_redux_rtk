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
  id: number
  title: string
  body: string
  userId: number
  date: string
  reactions: Reaction
}

type PostResponse = Omit<Post, 'reactions' | 'date'>

export interface PostState {
  posts: Post[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
  count: number

}

const initialState: PostState = {
  posts: [],
  status: 'idle',
  error: undefined,
  count: 0
}

export const fetchPosts = createAsyncThunk<
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
)

const postsSlice = createSlice({

  name: 'posts',

  initialState,

  reducers: {
    /* postAdded: {
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
    }, */
    reactionAdded (state, action: PayloadAction<{ postId: string | number; reaction: keyof Reaction }>) {

      const {
        postId,
        reaction
      } = action.payload

      const existingPost = state.posts.find(post => post.id === postId)

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

      state.posts = state.posts.concat(loadedPosts)
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      // In this case, we want to display an error message if the fetch fails (e.g. due to a network error) with a `try/catch` block
      state.status = 'failed'
      state.error = action.payload
    })
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      state.posts.push({
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

      const existingPost = state.posts.find(post => post.id === id)

      if (existingPost) {
        existingPost.title = action.payload.title
        existingPost.body = action.payload.body
        existingPost.date = new Date().toISOString()
      }

    })
    builder.addCase(deletePost.fulfilled, (state, action) => {

      if (!action.payload) return

      state.posts = state.posts.filter(post => post.id !== action.payload)

    })

  }

})

export const {
  // postAdded,
  reactionAdded,
  increaseCount
} = postsSlice.actions

export default postsSlice.reducer
