import { createSlice } from '@reduxjs/toolkit'

interface UIState {
  isDateModalOpen: boolean
}

const initialState: UIState = {
  isDateModalOpen: false
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
    }
  }
})

export const {
  onOpenDateModalReducer,
  onCloseDateModalReducer
} = uiSlice.actions