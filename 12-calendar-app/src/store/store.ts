import { AnyAction, ThunkAction, configureStore } from '@reduxjs/toolkit'

import { uiSlice } from './ui'
import { apiSlice } from '../api'

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>