import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import { AuthContext, AuthContextProps } from '../../src/auth'
import { routeObject } from '../../src/router/AppRouter'

describe('Pruebas en <AppRouter/>', () => {

  test('Debe de mostrar login si no está autenticado', () => {

    const contextValue: AuthContextProps = {
      authState: {
        isLoggedIn: false,
      },
      onLogout: jest.fn(),
      onLogin: jest.fn(),
    }

    const router = createMemoryRouter(
      routeObject,
      {
        initialEntries: ['/marvel'],
      }
    )

    render(
      <AuthContext.Provider value={contextValue}>
        <RouterProvider router={router}/>
      </AuthContext.Provider>
    )

    // screen.debug()

    expect(screen.getAllByText('Login').length).toBe(2)

  })

  test('Debe de mostrar el componente de <Marvel/> si está autenticado', () => {

    const contextValue: AuthContextProps = {
      authState: {
        isLoggedIn: true,
        user: 'test'
      },
      onLogout: jest.fn(),
      onLogin: jest.fn(),
    }

    const router = createMemoryRouter(
      routeObject,
      {
        initialEntries: ['/'],
      }
    )

    render(
      <AuthContext.Provider value={contextValue}>
        <RouterProvider router={router}/>
      </AuthContext.Provider>
    )

    // screen.debug()

    expect(screen.getByText('Marvel Comics')).toBeTruthy()
    expect(screen.getAllByText('test').length).toBeGreaterThanOrEqual(1)

  })

})
