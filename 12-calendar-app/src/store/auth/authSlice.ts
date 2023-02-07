import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface User {
  id: string
}

interface AuthState {
  user: User | null
}

const initialState: AuthState = {
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onSetCredentialsReducer: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    }
  }
})

export const {
  onSetCredentialsReducer
} = authSlice.actions