import { createAsyncThunk } from '@reduxjs/toolkit'
import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseError } from '@firebase/util'

import { Note } from './journalSlice'
import { RootState } from '../store'
import { firebaseDB } from '../../firebase/config'
import { loadNotes } from '../../helpers'

export const startNewNote = createAsyncThunk<
  Note,
  void,
  { rejectValue: string }
>(
  'journal/startNewNote',
  async (_, {
    rejectWithValue,
    getState
  }) => {

    try {

      const { uid } = (getState() as RootState).auth

      const newNote = {
        title: '',
        body: '',
        date: new Date().getTime()
      } as Note

      const newDocument = doc(collection(firebaseDB, `${uid}/journal/notes`))

      await setDoc(newDocument, newNote)

      newNote.id = newDocument.id

      return newNote

    } catch (err) {

      if (err instanceof FirebaseError) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue('Error while saving the note')

    }

  }
)

export const startLoadingNotes = createAsyncThunk<
  Note[],
  void,
  { rejectValue: string }
>(
  'journal/startLoadingNotes',
  async (_, {
    rejectWithValue,
    getState
  }) => {

    try {

      const { uid } = (getState() as RootState).auth

      if (!uid) return rejectWithValue('You must be logged in')

      return await loadNotes(uid)

    } catch (err) {

      if (err instanceof FirebaseError) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue('Error while loading notes')

    }

  }

)

export const startSaveNote = createAsyncThunk<
  Note,
  Note,
  { rejectValue: string }
>(
  'journal/startSaveNote',
  async (
    note,
    {
      rejectWithValue,
      getState
    }
  ) => {

    try {

      const { uid } = (getState() as RootState).auth

      const { id, imagesURLs, ...noteToSave } = note

      const documentRef = doc(firebaseDB, `${uid}/journal/notes/${id}`)
      await setDoc(documentRef, noteToSave, { merge: true })

      return note

    } catch (err) {      

      if (err instanceof FirebaseError) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue('Error while saving the note')

    }

  }
)