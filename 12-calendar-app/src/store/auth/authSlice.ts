import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'

import { User } from '../calendar'

interface AuthState {
  user: User | null
  token: string | null
}

interface SetCredentialsPayload {
  user: User
  token: string
}

const initialState: AuthState = {
  user: null,
  token: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onSetCredentialsReducer: (state, action: PayloadAction<SetCredentialsPayload>) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    onLogoutReducer: () => initialState
  }
})

export const authSliceReducer = persistReducer({
  key: 'auth',
  version: 1,
  storage,
  // whitelist: ['token']
}, authSlice.reducer)

export const {
  onSetCredentialsReducer,
  onLogoutReducer
} = authSlice.actions
