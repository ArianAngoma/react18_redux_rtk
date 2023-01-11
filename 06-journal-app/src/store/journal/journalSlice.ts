import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { startLoadingNotes, startNewNote, startSaveNote } from './thunks'

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
    setActiveNote: (state, action: PayloadAction<Note>) => {
      state.activeNote = action.payload
      state.messageSaved = ''
    },
    setNotes: (state, action) => {},
    setSavingNote: (state, action) => {},
    updateNote: (state, action) => {},
    deleteNoteById: (state, action) => {}
  },
  extraReducers: builder => {
    builder
      .addCase(startNewNote.pending, (state) => {
        state.isSaving = true
        state.messageSaved = ''
      })
      .addCase(startNewNote.fulfilled, (state, action) => {
        state.isSaving = false
        state.messageSaved = `Note created: ${action.payload.title}`
        state.notes.push(action.payload)
        state.activeNote = action.payload
      })

      .addCase(startLoadingNotes.fulfilled, (state, action) => {
        state.notes = action.payload
      })

      .addCase(startSaveNote.pending, (state) => {
        state.isSaving = true
        state.messageSaved = ''
      })
      .addCase(startSaveNote.fulfilled, (state, action) => {
        state.isSaving = false
        state.messageSaved = `Note saved: ${action.payload.title}`
        state.activeNote = action.payload
        state.notes = state.notes.map(note => 
          note.id === action.payload.id
            ? action.payload
            : note
        )
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