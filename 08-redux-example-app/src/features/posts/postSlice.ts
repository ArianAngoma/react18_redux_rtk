import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'

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
  error: string | null

}

const initialState: PostState = {
  posts: [],
  status: 'idle',
  error: null
}

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
  }
})

export const {
  postAdded,
  reactionAdded
} = postsSlice.actions

export default postsSlice.reducer
