import { createSlice } from '@reduxjs/toolkit'
import { startNewNote } from './thunks'

export interface Note {
  id: string
  title: string
  body: string
  date: number
  imagesURLs: string[]
}

interface InitialState {
  isSaving: boolean
  messageSaved: string
  notes: Note[],
  activeNote: Note | null
}

const initialState: InitialState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  activeNote: null
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addNewEmptyNote: (state) => {},
    setActiveNote: (state, action) => {},
    setNotes: (state, action) => {},
    setSavingNote: (state, action) => {},
    updateNote: (state, action) => {},
    deleteNoteById: (state, action) => {}
  },
  extraReducers: builder => {
    builder
      .addCase(startNewNote.pending, (state) => {
        state.isSaving = true
      })
      .addCase(startNewNote.fulfilled, (state, action) => {
        state.isSaving = false
        state.messageSaved = 'Saved'
        state.notes.push(action.payload)
        state.activeNote = action.payload
      })
  }
})

export const { 
  addNewEmptyNote, 
  setActiveNote,
  setNotes,
  setSavingNote,
  updateNote,
  deleteNoteById 
} = journalSlice.actions