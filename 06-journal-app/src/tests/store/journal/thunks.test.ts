import { startNewNote } from '../../../store'

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

  })

})
