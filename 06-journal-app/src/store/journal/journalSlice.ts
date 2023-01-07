import { createSlice } from '@reduxjs/toolkit'

interface Note {
  id: string
  title: string
  body: string
  date: Date
  imagesURLs: string[]
}

interface InitialState {
  isSaving: boolean
  messageSaved: string
  notes: Note[],
  activeNode: Note | null
}

const initialState: InitialState = {
  isSaving: true,
  messageSaved: '',
  notes: [],
  activeNode: null
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