import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite'

import { startNewNote } from '../../../store'
import { firebaseDB } from '../../../firebase/config'

describe('Pruebas en Journal Thunks', () => {

  const dispatch = vi.fn()
  const getState = vi.fn()

  beforeEach(() => {
    vi.clearAllTimers()
  })

  test('Debe de crear una nueva nota en blanco', async () => {

    const uid = '123456789'

    getState.mockReturnValue({
      auth: {
        uid
      }
    })

    await startNewNote()(dispatch, getState, {})

    const fulfilledAction = dispatch.mock.calls[1][0]    
    
    expect(fulfilledAction).toEqual({
      meta: {
        arg: undefined,
        requestId: expect.any(String),
        requestStatus: 'fulfilled'
      },
      payload: {
        body: '',
        date: expect.any(Number),
        id: expect.any(String),
        title: '',
        imagesURLs: []
      },
      type: startNewNote.fulfilled.type
    })

    // Clear item from firestore
    const collectionRef = collection(firebaseDB, `${uid}/journal/notes`)
    const documents = await getDocs(collectionRef)

    const deletePromises: Promise<void>[] = []
    documents.forEach(doc => deletePromises.push(deleteDoc(doc.ref)))
    await Promise.all(deletePromises)

  })

})
