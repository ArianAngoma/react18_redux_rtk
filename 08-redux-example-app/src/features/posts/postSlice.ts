import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'

interface PostState {
  id: string
  title: string
  content: string
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
        content
      }: Omit<PostState, 'id'>) {
        return {
          payload: {
            id: nanoid(),
            title,
            content
          }
        }
      }
    }
  }
})

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer
