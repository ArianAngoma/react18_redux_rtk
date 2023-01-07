import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  startLoginWithEmailPassword,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLogout
} from './thunks'

interface InitialState {
  status: 'checking' | 'authenticated' | 'not-authenticated'
  uid: string | null
  email: string | null
  displayName: string | null
  photoURL: string | null
  errorMessage: string | null
}

const initialState: InitialState = {
  status: 'checking',
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
    login: (state, action: PayloadAction<Omit<InitialState, 'errorMessage' | 'status'>>) => {
      const { uid, email, displayName, photoURL } = action.payload

      state.status = 'authenticated'
      state.uid = uid
      state.email = email
      state.displayName = displayName
      state.photoURL = photoURL
      state.errorMessage = null
    },
    logout: (_, action: PayloadAction<Pick<InitialState, 'errorMessage'>>) => ({
      ...initialState,
      status: 'not-authenticated',
      errorMessage: action.payload.errorMessage
    })
  },
  extraReducers: builder => {
    builder
      .addCase(startLoginWithEmailPassword.pending, () => initialState)
      .addCase(startLoginWithEmailPassword.rejected, (_, action) => ({
        ...initialState,
        status: 'not-authenticated',
        errorMessage: action.payload || 'Something went wrong'
      }))
      .addCase(startLoginWithEmailPassword.fulfilled, (state, action) => {
        const { displayName, email, photoURL, uid } = action.payload

        state.status = 'authenticated'
        state.uid = uid
        state.email = email
        state.displayName = displayName
        state.photoURL = photoURL
        state.errorMessage = null
      })

      .addCase(startGoogleSignIn.pending, () => initialState)
      .addCase(startGoogleSignIn.rejected, (_, action) => ({
        ...initialState,
        status: 'not-authenticated',
        errorMessage: action.payload || 'Something went wrong'
      }))
      .addCase(startGoogleSignIn.fulfilled, (state, action) => {
        const { displayName, email, photoURL, uid } = action.payload
        state.status = 'authenticated'
        state.uid = uid
        state.email = email
        state.displayName = displayName
        state.photoURL = photoURL
        state.errorMessage = null
      })

      .addCase(startCreatingUserWithEmailPassword.pending, () => initialState)
      .addCase(startCreatingUserWithEmailPassword.rejected, (_, action) => ({
        ...initialState,
        status: 'not-authenticated',
        errorMessage: action.payload || 'Something went wrong'
      }))
      .addCase(startCreatingUserWithEmailPassword.fulfilled, (state, action) => {
        const { displayName, email, photoURL, uid } = action.payload

        state.status = 'authenticated'
        state.uid = uid
        state.email = email
        state.displayName = displayName
        state.photoURL = photoURL
        state.errorMessage = null
      })
      
      .addCase(startLogout.pending, () => initialState)
      .addCase(startLogout.rejected, (_, action) => ({
        ...initialState,
        status: 'not-authenticated',
        errorMessage: action.payload || 'Something went wrong',
      }))
      .addCase(startLogout.fulfilled, () => ({
        ...initialState,
        status: 'not-authenticated',
      }))
  }
})

export const {
  login,
  logout,
} = authSlice.actions
