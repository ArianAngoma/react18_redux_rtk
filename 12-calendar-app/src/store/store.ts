import { 
  AnyAction,
  Reducer,
  ThunkAction,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit'
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { uiSlice } from './ui'
import { apiSlice } from '../api'
import { authSlice, authSliceReducer } from './auth'

const appReducer = combineReducers({
  ui: uiSlice.reducer,
  auth: authSliceReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
})

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === authSlice.actions.onLogoutReducer.type) {
    storage.removeItem('persist:auth')

    state = {} as RootState
  }

  return appReducer(state, action)
}

export const store = configureStore({
  reducer: appReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: { // false
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  }).concat(apiSlice.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>