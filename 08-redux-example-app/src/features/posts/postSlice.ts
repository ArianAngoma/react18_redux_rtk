import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'

interface PostState {
  id: string
  title: string
  content: string
  userId?: string
}

const initialState: PostState[] = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
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
      }: Omit<PostState, 'id'>) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId
          }
        }
      }
    }
  }
})

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer
