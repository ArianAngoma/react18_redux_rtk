import { collection, getDocs } from 'firebase/firestore/lite'

import { firebaseDB } from '../firebase/config'
import { Note } from '../store'

export const loadNotes = async (uid: string): Promise<Note[]> => {

  const collectionRef = collection(firebaseDB, `${uid}/journal/notes`)

  const documents = await getDocs(collectionRef)

  const notes: Note[] = []

  for (const document of documents.docs) {
    notes.push({
      id: document.id,
      ...document.data()
    } as Note)
  }

  return notes

}