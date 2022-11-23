import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import { AuthContext, AuthContextProps } from '../../src/auth'
import PrivateRoute from '../../src/router/PrivateRoute'

describe('Pruebas en <Private/>', () => {

  test('Debe de mostrar <Outlet/> si está autenticado', () => {

    // Storage.prototype.setItem = jest.fn()

    const contextValue: AuthContextProps = {
      authState: {
        isLoggedIn: true,
      },
      onLogout: jest.fn(),
      onLogin: jest.fn(),
    }

    const router = createMemoryRouter(
      [
        {
          element: <PrivateRoute/>,
          children: [
            {
              index: true,
              element: <h1>Private Route</h1>
            }
          ]
        }
      ]
    )

    render(
      <AuthContext.Provider value={contextValue}>
        <RouterProvider router={router}/>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Private Route')).toBeTruthy()
    // expect(localStorage.setItem).toHaveBeenCalled()

  })

})
