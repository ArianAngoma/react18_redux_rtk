import { fireEvent, render, screen } from '@testing-library/react'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import { LoginPage } from '../../../auth'
import { authSlice } from '../../../store'
import { notAuthenticatedState } from '../../fixtures/authFixture'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: notAuthenticatedState
  }
})

describe('Pruebas en <LoginPage/>', () => {

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
    
  })

})