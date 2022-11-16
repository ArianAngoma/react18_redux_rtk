import authReducer, { Action, AuthState } from '../../../src/auth/context/AuthReducer'

describe('Test in AuthReducer', () => {

  const initialState: AuthState = {
    isLoggedIn: false
  }

  test('should return user logged', () => {

    const action: Action = {
      type: '[AUTH] Login',
      payload: {
        user: 'test'
      }
    }

    const state = authReducer(initialState, action)

    expect(state).toEqual({
      isLoggedIn: true,
      user: action.payload.user
    })

  })

  test('should return user logged out', () => {

    const state: AuthState = {
      user: 'test',
      isLoggedIn: true
    }

    const action: Action = {
      type: '[AUTH] Logout'
    }

    const newState = authReducer(state, action)

    expect(newState).toEqual({
      isLoggedIn: false
    })

  })

})
