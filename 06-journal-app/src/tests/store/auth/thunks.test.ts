import * as providers from '../../../firebase/providers'
import { startLoginWithEmailPassword, store } from '../../../store'

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

})