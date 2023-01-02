import { createSlice } from '@reduxjs/toolkit'

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
    login: (state, action) => {

    },
    logout: (state) => {

    },
    checkingCredentials: (state) => {

    }
  }
})

export const {
  login,
  logout,
  checkingCredentials
} = authSlice.actions
