import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Event } from '../calendar'

export type EventToModal = Omit<Event, 'id'> & { id?: string }

interface UIState {
  isDateModalOpen: boolean
  activeEvent: EventToModal | null
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
    onSetActiveEventReducer: (state, action: PayloadAction<EventToModal>) => {
      state.activeEvent = action.payload
    },
    onClearActiveEventReducer: state => {
      state.activeEvent = null
    }
  }
})

export const {
  onOpenDateModalReducer,
  onCloseDateModalReducer,
  onSetActiveEventReducer,
  onClearActiveEventReducer
} = uiSlice.actions