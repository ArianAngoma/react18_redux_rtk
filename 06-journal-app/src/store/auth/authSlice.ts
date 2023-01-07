import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { startLoginWithEmailPassword, startCreatingUserWithEmailPassword, startGoogleSignIn } from './thunks'

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
    logout: (state, action: PayloadAction<Pick<InitialState, 'errorMessage'>>) => {
      state.status = 'not-authenticated'
      state.uid = null
      state.email = null
      state.displayName = null
      state.photoURL = null
      state.errorMessage = action.payload.errorMessage
    }
  },
  extraReducers: builder => {
    builder
      .addCase(startLoginWithEmailPassword.pending, (state) => {
        state.status = 'checking'
        state.uid = null
        state.email = null
        state.displayName = null
        state.photoURL = null
        state.errorMessage = null
      })
      .addCase(startLoginWithEmailPassword.rejected, (state, action) => {
        state.status = 'not-authenticated'
        state.uid = null
        state.email = null
        state.displayName = null
        state.photoURL = null
        state.errorMessage = action.payload || 'Something went wrong'
      })
      .addCase(startLoginWithEmailPassword.fulfilled, (state, action) => {
        const { displayName, email, photoURL, uid } = action.payload

        state.status = 'authenticated'
        state.uid = uid
        state.email = email
        state.displayName = displayName
        state.photoURL = photoURL
        state.errorMessage = null
      })

      .addCase(startGoogleSignIn.pending, (state) => {
        state.status = 'checking'
        state.uid = null
        state.email = null
        state.displayName = null
        state.photoURL = null
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

      .addCase(startCreatingUserWithEmailPassword.pending, (state) => {
        state.status = 'checking'
        state.uid = null
        state.email = null
        state.displayName = null
        state.photoURL = null
        state.errorMessage = null
      })
      .addCase(startCreatingUserWithEmailPassword.rejected, (state, action) => {
        state.status = 'not-authenticated'
        state.uid = null
        state.email = null
        state.displayName = null
        state.photoURL = null
        state.errorMessage = action.payload || 'Something went wrong'

        // dispatch logout to clear the state
        // dispatch(logout({ errorMessage: action.payload || 'Something went wrong' }))
      })
      .addCase(startCreatingUserWithEmailPassword.fulfilled, (state, action) => {
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
} = authSlice.actions
