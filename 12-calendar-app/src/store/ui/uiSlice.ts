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
    onOpenDateModal: state => {
      state.isDateModalOpen = true
    },
    onCloseDateModal: state => {
      state.isDateModalOpen = false
    }
  }
})

export const {
  onOpenDateModal
} = uiSlice.actions