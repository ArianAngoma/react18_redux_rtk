import { createAsyncThunk } from '@reduxjs/toolkit'
import { collection, doc, setDoc } from 'firebase/firestore/lite'

import { Note } from './journalSlice'
import { RootState } from '../store'
import { firebaseDB } from '../../firebase/config'

export const startNewNate = createAsyncThunk<
  any,
  Pick<Note, 'title' | 'body'>,
  { rejectValue: string }
>(
  'journal/startNewNate',
  async ({
    body,
    title
  }, {
    rejectWithValue,
    getState
  }) => {

    try {

      const { uid } = (getState() as RootState).auth

      const newDocument = doc(collection(firebaseDB, `${uid}/journal/notes`))

      const setDocResponse = await setDoc(newDocument, {
        title,
        body,
        date: new Date().getTime()
      })

      console.log({ setDocResponse, newDocument })

    } catch (err) {

    }

  }
)