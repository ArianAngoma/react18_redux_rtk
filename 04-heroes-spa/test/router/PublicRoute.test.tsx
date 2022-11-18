import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { AuthContext, AuthContextProps, LoginPage } from '../../src/auth'
import PublicRoute from '../../src/router/PublicRoute'

describe('Pruebas en <PublicRoute />', () => {

  test('Debe de mostrar el <Outlet /> si no está autenticado', () => {

    const contextValue: AuthContextProps = {
      authState: {
        isLoggedIn: false,
      },
      onLogout: jest.fn(),
      onLogin: jest.fn(),
    }

    const router = createMemoryRouter(
      [
        {
          element: <PublicRoute/>,
          children: [
            {
              path: 'login',
              element: <LoginPage/>
            }
          ]
        }
      ],
      {
        initialEntries: ['/login'],
      }
    )

    render(
      <AuthContext.Provider value={contextValue}>
        <RouterProvider router={router}/>
      </AuthContext.Provider>
    )

    // screen.debug()

    expect(screen.getByRole('heading').innerHTML).toBe('Login')

  })

})
