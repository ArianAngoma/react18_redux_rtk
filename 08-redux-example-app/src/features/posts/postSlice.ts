import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

interface PostState {
  id: string
  title: string
  content: string
  userId?: string
  date: string
}

const initialState: PostState[] = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    date: sub(new Date(), { minutes: 10 }).toISOString()
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    date: sub(new Date(), { minutes: 5 }).toISOString()
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
            date: new Date().toISOString()
          }
        }
      }
    }
  }
})

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer
