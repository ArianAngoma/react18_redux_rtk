import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

interface Reaction {
  thumbUp: number
  wow: number
  heart: number
  rocket: number
  coffee: number
}

interface PostState {
  id: string
  title: string
  content: string
  userId?: string
  date: string
  reactions: Reaction
}

const initialState: PostState[] = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0
    }
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0
    }
  }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer (state, action: PayloadAction<PostState>) {
        state.push(action.payload)
      },
      prepare ({
        title,
        content,
        userId
      }: Omit<PostState, 'id' | 'date'>) {
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

      const existingPost = state.find(post => post.id === postId)

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
