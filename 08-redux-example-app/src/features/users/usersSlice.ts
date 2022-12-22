import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

const initialState: User[] = []

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {

    const response = await axios.get<User[]>(USERS_URL)
    return response.data

  } catch (err) {
    if (err instanceof AxiosError) {
      return rejectWithValue(err.message)
    }
    return rejectWithValue('Something went wrong')
  }
})

const usersSlice = createSlice({
  name: 'users',

  initialState,

  reducers: {},

  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const {} = usersSlice.actions

export default usersSlice.reducer
