import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Event } from '../calendar'

interface UIState {
  isDateModalOpen: boolean
  activeEvent: Event | null
}

const initialState: UIState = {
  isDateModalOpen: false,
  activeEvent: null
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onOpenDateModalReducer: state => {
      state.isDateModalOpen = true
    },
    onCloseDateModalReducer: state => {
      state.isDateModalOpen = false
    },
    onSetActiveEventReducer: (state, action: PayloadAction<Event>) => {
      state.activeEvent = action.payload
    }
  }
})

export const {
  onOpenDateModalReducer,
  onCloseDateModalReducer,
  onSetActiveEventReducer
} = uiSlice.actions