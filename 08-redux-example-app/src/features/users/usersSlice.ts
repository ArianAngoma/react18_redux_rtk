import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  id: string
  name: string
}

const initialState: UserState[] = [
  {
    id: '0',
    name: 'Arian Angoma'
  },
  {
    id: '1',
    name: 'Andrea Angoma'
  },
  {
    id: '2',
    name: 'Israel Angoma'
  }
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})

export const {} = usersSlice.actions

export default usersSlice.reducer
