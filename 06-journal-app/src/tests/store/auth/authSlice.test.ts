import { PayloadAction } from '@reduxjs/toolkit'

import {
  InitialState as JournalInitialState,
  authSlice,
  initialState as journalInitialState,
  login,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startCreatingUserWithEmailPassword,
  startLogout
} from '../../../store'
import {
  ResponseSignInFulfilled,
  LoginWithEmailPasswordParams,
  RegisterWithEmailPasswordParams
} from '../../../firebase/providers'

describe('Pruebas en AuthSlice', () => {

  test('Debería de retornar el estado inicial', () => {

    const state = authSlice.reducer(undefined, { type: undefined })

    expect(state).toEqual(journalInitialState)

  })

  test('Debería de autenticar al usuario', () => {

    const user: Omit<JournalInitialState, 'errorMessage' | 'status'> = {
      uid: '123',
      email: 'arian.angoma.js@gmail.com',
      displayName: 'Arian Angoma',
      photoURL: 'image.png'
    }

    const state = authSlice.reducer(journalInitialState, login(user))

    expect(state).toEqual({
      ...journalInitialState,
      status: 'authenticated',
      ...user
    })

  })

  test('Debería de borrar el estado del usuario', () => {

    const action: PayloadAction<Pick<JournalInitialState, 'errorMessage'>> = {
      type: authSlice.actions.logout.type,
      payload: {
        errorMessage: 'Error'
      }
    }

    const state = authSlice.reducer(journalInitialState, action)

    expect(state).toEqual({
      ...journalInitialState,
      status: 'not-authenticated',
      errorMessage: action.payload.errorMessage
    })

  })

  test('Debería de tener el estado correctamente cuando startLoginWithEmailPassword esta en pending', () => {

    const action = startLoginWithEmailPassword.pending

    const state = authSlice.reducer(journalInitialState, action)

    expect(state).toEqual(journalInitialState)

  })

  test('Debería de tener el estado correctamente cuando startLoginWithEmailPassword esta en rejected', () => {

    const user: LoginWithEmailPasswordParams = {
      email: 'arian.angoma.js@gmail.com',
      password: '123123'
    }

    const errorMessage = 'User not found'

    const action = startLoginWithEmailPassword.rejected(null, 'rejected', user, errorMessage)

    const state = authSlice.reducer(journalInitialState, action)

    expect(state).toEqual({
      ...journalInitialState,
      status: 'not-authenticated',
      errorMessage: errorMessage
    })

  })

  test('Debería de tener el estado correctamente cuando startLoginWithEmailPassword esta en fulfilled', () => {

    const responseFulfilled: ResponseSignInFulfilled = {
      displayName: 'Arian Angoma',
      email: 'arian.angoma.js@gmail.com',
      photoURL: 'image.png',
      uid: '123',
      ok: true
    }

    const user: LoginWithEmailPasswordParams = {
      email: 'arian.angoma.js@gmail.com',
      password: '123123'
    }

    const action = startLoginWithEmailPassword.fulfilled(responseFulfilled, 'fulfilled', user)

    const state = authSlice.reducer(journalInitialState, action)

    const { ok, ...rest } = responseFulfilled

    expect(state).toEqual({
      ...journalInitialState,
      status: 'authenticated',
      ...rest
    })

  })

  test('Debería de tener el estado correctamente cuando startGoogleSignIn esta en pending', () => {

    const action = startGoogleSignIn.pending

    const state = authSlice.reducer(journalInitialState, action)

    expect(state).toEqual(journalInitialState)

  })

  test('Debería de tener el estado correctamente cuando startGoogleSignIn esta en rejected', () => {

    const errorMessage = 'User not found'

    const action = startGoogleSignIn.rejected(null, 'rejected', undefined, errorMessage)

    const state = authSlice.reducer(journalInitialState, action)

    expect(state).toEqual({
      ...journalInitialState,
      status: 'not-authenticated',
      errorMessage: errorMessage
    })

  })

  test('Debería de tener el estado correctamente cuando startGoogleSignIn esta en fulfilled', () => {

    const responseFulfilled: ResponseSignInFulfilled = {
      displayName: 'Arian Angoma',
      email: 'arian.angoma.js@gmail.com',
      ok: true,
      photoURL: 'image.png',
      uid: '123'
    }

    const action = startGoogleSignIn.fulfilled(responseFulfilled, 'fulfilled', undefined)

    const state = authSlice.reducer(journalInitialState, action)

    const { ok, ...rest } = responseFulfilled

    expect(state).toEqual({
      ...journalInitialState,
      status: 'authenticated',
      ...rest
    })

  })

  test('Debería de tener el estado correctamente cuando startCreatingUserWithEmailPassword esta en pending', () => {

    const action = startCreatingUserWithEmailPassword.pending

    const state = authSlice.reducer(journalInitialState, action)

    expect(state).toEqual(journalInitialState)

  })

  test('Debería de tener el estado correctamente cuando startCreatingUserWithEmailPassword esta en rejected', () => {

    const user: RegisterWithEmailPasswordParams = {
      displayName: 'Arian Angoma',
      email: 'arian.angoma.js@gmail.com',
      password: '123123',
    }

    const action = startCreatingUserWithEmailPassword.rejected(null, 'rejected', user, 'Error with creating user')

    const state = authSlice.reducer(journalInitialState, action)

    expect(state).toEqual({
      ...journalInitialState,
      status: 'not-authenticated',
      errorMessage: 'Error with creating user'
    })

  })

  test('Debería de tener el estado correctamente cuando startCreatingUserWithEmailPassword esta en fulfilled', () => {

    const user: RegisterWithEmailPasswordParams = {
      displayName: 'Arian Angoma',
      email: 'arian.angoma.js@gmail.com',
      password: '123123',
    }

    const responseFulfilled: ResponseSignInFulfilled = {
      displayName: user.displayName,
      email: user.email,
      photoURL: 'image.png',
      uid: '123',
      ok: true,
    }

    const action = startCreatingUserWithEmailPassword.fulfilled(responseFulfilled, 'fulfilled', user)

    const state = authSlice.reducer(journalInitialState, action)

    const { ok, ...rest } = responseFulfilled

    expect(state).toEqual({
      ...journalInitialState,
      status: 'authenticated',
      ...rest
    })

  })

  test('Debería de tener el estado correctamente cuando startLogout esta en pending', () => {

    const action = startLogout.pending

    const state = authSlice.reducer(journalInitialState, action)
    
    expect(state).toEqual(journalInitialState)

  })

  test('Debería de tener el estado correctamente cuando startLogout esta en rejected', () => {

    const action = startLogout.rejected(null, 'rejected', undefined, 'Error with logout')

    const state = authSlice.reducer(journalInitialState, action)

    expect(state).toEqual({
      ...journalInitialState,
      status: 'not-authenticated',
      errorMessage: 'Error with logout'
    })

  })

  test('Debería de tener el estado correctamente cuando startLogout esta en fulfilled', () => {

    const action = startLogout.fulfilled(undefined, 'fulfilled', undefined)

    const state = authSlice.reducer(journalInitialState, action)

    expect(state).toEqual({
      ...journalInitialState,
      status: 'not-authenticated',
      errorMessage: null
    })

  })

})