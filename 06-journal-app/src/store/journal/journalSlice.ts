import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  startDeletingNote,
  startLoadingNotes,
  startNewNote,
  startSaveNote,
  startUploadingFiles
} from './thunks'

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
    setActiveNote: (state, action: PayloadAction<Note>) => {
      state.activeNote = action.payload
      state.messageSaved = ''
    },
    clearStateLogout: () => initialState,
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

      .addCase(startUploadingFiles.pending, (state) => {
        state.isSaving = true
        state.messageSaved = ''
      })
      .addCase(startUploadingFiles.fulfilled, (state, action) => {

        if (state.activeNote) {

          state.activeNote = {
            ...state.activeNote,
            imagesURLs: state.activeNote.imagesURLs 
              ? [...state.activeNote.imagesURLs, ...action.payload] 
              : action.payload
          }

        }

        state.isSaving = false
        
      })

      .addCase(startDeletingNote.pending, (state) => {
        state.isSaving = true
        state.messageSaved = ''
      })
      .addCase(startDeletingNote.fulfilled, (state, action) => {
          
        state.isSaving = false
        state.messageSaved = `Note deleted: ${action.payload.title}`
        state.notes = state.notes.filter(note => note.id !== action.payload.id)
        state.activeNote = null
  
      })

  }
})

export const { 
  setActiveNote,
  clearStateLogout
} = journalSlice.actions