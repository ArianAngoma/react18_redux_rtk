import * as providers from '../../../firebase/providers'
import { clearStateLogout, startLoginWithEmailPassword, startLogout, store } from '../../../store'

describe('Pruebas en los thunks de authSlice', () => {

  test('Deberia dispararse startLoginWithEmailPassword - Exitoso', async () => {

    const response: providers.ResponseSignInFulfilled = {
      ok: true,
      displayName: 'Arian Angoma',
      email: 'arian.angoma.js@gmail.com',
      photoURL: 'image.png',
      uid: '123'
    }

    vi.spyOn(providers, 'loginWithEmailPassword').mockResolvedValue(response)

    await store.dispatch(startLoginWithEmailPassword({
      email: 'arian.angoma.js@gmail.com',
      password: '123123'
    }))

    expect(providers.loginWithEmailPassword).toHaveBeenCalled()
    expect(providers.loginWithEmailPassword).toHaveBeenCalledWith({
      email: 'arian.angoma.js@gmail.com',
      password: '123123'
    })
    
  })

  test('Deberia dispararse startLoginWithEmailPassword - Fallido', async () => {

    const user: providers.LoginWithEmailPasswordParams = {
      email: 'arian.angoma.js@gmail.com',
      password: '123123'
    }

    const response: providers.ResponseSignInRejected = {
      ok: false,
      errorMessage: 'Email no encontrado'
    }

    vi.spyOn(providers, 'loginWithEmailPassword').mockResolvedValue(response)

    await startLoginWithEmailPassword(user)(store.dispatch, store.getState, null)

    expect(providers.loginWithEmailPassword).toHaveBeenCalled()
    expect(providers.loginWithEmailPassword).toHaveBeenCalledWith({
      email: 'arian.angoma.js@gmail.com',
      password: '123123'
    })
    
    const state = store.getState()

    expect(state.auth.errorMessage).toBe('Email no encontrado')
    expect(state.auth.status).toBe('not-authenticated')

  })

  test('startLogout debe de llamar logoutFirebase y clearStateLogout', async () => {

    const dispatchMock = vi.fn()

    vi.spyOn(providers, 'logoutFirebase')

    await startLogout()(dispatchMock, store.getState, null)

    expect(providers.logoutFirebase).toHaveBeenCalled()
    expect(dispatchMock).toHaveBeenCalledWith(clearStateLogout())

  })

})