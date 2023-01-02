import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'

import { authSlice } from './auth'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
