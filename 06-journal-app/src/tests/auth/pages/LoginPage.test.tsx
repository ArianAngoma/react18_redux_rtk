import { fireEvent, render, screen } from '@testing-library/react'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import { LoginPage } from '../../../auth'
import { authSlice } from '../../../store'
import * as authThunks from '../../../store/auth/thunks'
import { notAuthenticatedState } from '../../fixtures/authFixture'
import { LoginWithEmailPasswordParams } from '../../../firebase/providers'
import * as customHookDispatch from '../../../hooks/useAppDispatch'

const startGoogleSignInMock = vi.fn()

const startLoginWithEmailPasswordMock = vi.fn()

vi.spyOn(authThunks, 'startGoogleSignIn').mockImplementation(startGoogleSignInMock)

vi.spyOn(authThunks, 'startLoginWithEmailPassword').mockImplementation(startLoginWithEmailPasswordMock)

const useAppDispatchMock = () => vi.fn()

vi.spyOn(customHookDispatch, 'useAppDispatch').mockImplementation(useAppDispatchMock)

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: notAuthenticatedState
  }
})

describe('Pruebas en <LoginPage/>', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('Debe de mostrar el componente correctamente', () => {

    const router = createMemoryRouter(
      [
        {
          path: '/auth/login',
          element: <LoginPage/>
        }
      ],
      {
        initialEntries: ['/auth/login']
      }
    )

    render(
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    )

    // screen.debug()

    expect(screen.getAllByText('Login')).toHaveLength(2)

  })

  test('Boton de Google debe de llamar el startGoogleSignIn', () => {

    const router = createMemoryRouter(
      [
        {
          path: '/auth/login',
          element: <LoginPage/>
        }
      ],
      {
        initialEntries: ['/auth/login']
      }
    )

    render(
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    )

    const googleBtn = screen.getByLabelText('google-button')
    fireEvent.click(googleBtn)

    expect(startGoogleSignInMock).toHaveBeenCalled()

  })

  test('Submit debe de llamar startLoginWithEmailPassword', () => {

    const user: LoginWithEmailPasswordParams = {
      email: 'arian.angoma.js@gmail.com',
      password: '123123'
    }

    const router = createMemoryRouter(
      [
        {
          path: '/auth/login',
          element: <LoginPage/>
        }
      ],
      {
        initialEntries: ['/auth/login']
      }
    )

    render(
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    )

    const emailInput = screen.getByRole('textbox', {
      name: 'Email'
    })
    fireEvent.change(emailInput, {
      target: {
        name: 'email',
        value: user.email
      }
    })

    const passwordInput = screen.getByTestId('password-input')
    fireEvent.change(passwordInput, {
      target: {
        name: 'password',
        value: user.password
      }
    })

    const loginForm = screen.getByLabelText('login-form')
    fireEvent.submit(loginForm)
    
    expect(startLoginWithEmailPasswordMock).toHaveBeenCalledWith(user)

  })

})