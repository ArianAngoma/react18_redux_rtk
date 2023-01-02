import { createSlice } from '@reduxjs/toolkit'
import { checkingAuthentication, startGoogleSignIn } from './thunks'

interface InitialState {
  status: 'checking' | 'authenticated' | 'not-authenticated'
  uid: string | null
  email: string | null
  displayName: string | null
  photoURL: string | null
  errorMessage: string | null
}

const initialState: InitialState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {

    },
    logout: (state) => {

    },
    checkingCredentials: (state) => {

    }
  },
  extraReducers: builder => {
    builder
      .addCase(checkingAuthentication.pending, (state) => {
        state.status = 'checking'
      })
      .addCase(startGoogleSignIn.pending, (state) => {
        state.status = 'checking'
      })
  }
})

export const {
  login,
  logout,
  checkingCredentials
} = authSlice.actions
