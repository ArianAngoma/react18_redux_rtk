import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { AuthContext, AuthContextProps } from '../../../src/auth'
import { routeObject } from '../../../src/router/AppRouter'

// Siempre que hacermos un mock su nombre debe de iniciar con mock
const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}))

describe('Pruebas en <Navbar />', () => {

  // const onLogoutContextMock = jest.fn()

  const contextValue: AuthContextProps = {
    authState: {
      isLoggedIn: true,
      user: 'Arian Angoma'
    },
    // onLogout: onLogoutContextMock,
    onLogout: jest.fn(),
    onLogin: jest.fn(),
  }

  const router = createMemoryRouter(
    routeObject,
    {
      initialEntries: ['/marvel'],
    }
  )

  beforeEach(() => {

    jest.clearAllMocks()

  })

  test('Debe de mostrar el nombre del usuario', () => {

    render(
      <AuthContext.Provider value={contextValue}>
        <RouterProvider router={router}/>
      </AuthContext.Provider>
    )

    // screen.debug()

    expect(screen.getByText('Arian Angoma')).toBeTruthy()

  })

  test('Debe de llamar el logout y navigate cuando se hace click en el boton', () => {

    render(
      <AuthContext.Provider value={contextValue}>
        <RouterProvider router={router}/>
      </AuthContext.Provider>
    )

    // screen.debug()

    const logoutButton = screen.getByText('Logout')

    fireEvent.click(logoutButton)

    expect(contextValue.onLogout).toHaveBeenCalled()
    expect(mockUseNavigate).toHaveBeenCalledWith(
      '/login',
      {
        replace: true,
        state: { from: '/marvel' }
      }
    )

  })

})
