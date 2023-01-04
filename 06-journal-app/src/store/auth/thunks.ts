import { createAsyncThunk } from '@reduxjs/toolkit'
import { ResponseSignInWithGoogle, ResponseSignInWithGoogleFulfilled, signInWithGoogle } from '../../firebase/providers'

export const checkingAuthentication = createAsyncThunk<
  any,
  { email: string, password: string },
  { rejectValue: string }
>(
  'auth/checkingAuthentication',
  async ({
    email,
    password
  },
    { rejectWithValue }
  ) => {

    try {

    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue('Something went wrong')
    }

  }
)

export const startGoogleSignIn = createAsyncThunk<
  ResponseSignInWithGoogleFulfilled,
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
