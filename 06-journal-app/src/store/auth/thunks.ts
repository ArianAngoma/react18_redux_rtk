import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  LoginWithEmailPasswordParams,
  RegisterWithEmailPasswordParams,
  ResponseSignInFulfilled,
  loginWithEmailPassword,
  logoutFirebase,
  registerWithEmailPassword,
  signInWithGoogle
} from '../../firebase/providers'

export const startLoginWithEmailPassword = createAsyncThunk<
  ResponseSignInFulfilled,
  LoginWithEmailPasswordParams,
  { rejectValue: string }
>(
  'auth/startLoginWithEmailPassword',
  async ({
    email,
    password
  },
    { rejectWithValue }
  ) => {

    try {

      const result = await loginWithEmailPassword({
        email,
        password
      })

      if (result.ok) return result
      else return rejectWithValue(result.errorMessage)

    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue('Something went wrong')
    }

  }
)

export const startGoogleSignIn = createAsyncThunk<
  ResponseSignInFulfilled,
  void,
  { rejectValue: string }
>(
  'auth/startGoogleSignIn',
  async (_, { rejectWithValue }) => {

    try {

      const result = await signInWithGoogle()

      if (result.ok) return result
      else return rejectWithValue(result.errorMessage)

    } catch (err) {

      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }

      return rejectWithValue('Something went wrong')

    }

  }
)

export const startCreatingUserWithEmailPassword = createAsyncThunk<
  ResponseSignInFulfilled,
  RegisterWithEmailPasswordParams,
  { rejectValue: string }
>(
  'auth/startCreatingUserWithEmailPassword',
  async (
    {
      email,
      password,
      displayName
    },
    { rejectWithValue, dispatch }
  ) => {

    try {

      const result = await registerWithEmailPassword({
        displayName,
        email,
        password
      })

      if (result.ok) return result
      else return rejectWithValue(result.errorMessage)

    } catch (err) {

      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }

      return rejectWithValue('Something went wrong')

    }

  }
)

export const startLogout = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(
  'auth/startLogout',
  async (_, { rejectWithValue }) => {

    try {

      await logoutFirebase()

    } catch (err) {

      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }

      return rejectWithValue('Something went wrong')

    }

  }
)
