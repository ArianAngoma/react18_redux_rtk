import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    logout: (state, action: PayloadAction<Pick<InitialState, 'errorMessage'>>) => {

      state = {
        ...initialState,
        errorMessage: action.payload.errorMessage
      }

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
        state.errorMessage = null
      })
      .addCase(startGoogleSignIn.rejected, (state, action) => {

        state.status = 'not-authenticated'
        state.uid = null
        state.email = null
        state.displayName = null
        state.photoURL = null
        state.errorMessage = action.payload || 'Something went wrong'

      })
      .addCase(startGoogleSignIn.fulfilled, (state, action) => {

        const { displayName, email, photoURL, uid } = action.payload

        state.status = 'authenticated'
        state.uid = uid
        state.email = email
        state.displayName = displayName
        state.photoURL = photoURL
        state.errorMessage = null

      })
  }
})

export const {
  login,
  logout,
  checkingCredentials
} = authSlice.actions
