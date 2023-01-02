import { createAsyncThunk } from '@reduxjs/toolkit'

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
  any,
  void,
  { rejectValue: string }
>(
  'auth/startGoogleSignIn',
  async (
    _,
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
