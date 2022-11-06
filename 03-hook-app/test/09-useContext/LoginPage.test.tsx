import UserContext, { UserContextProps } from '../../src/09-useContext/context/UserContext'
import { fireEvent, render, screen } from '@testing-library/react'
import LoginPage from '../../src/09-useContext/LoginPage'

describe('Pruebas en <LoginPage />', () => {

  test('Debe de mostrar el componente sin el usuario', () => {

    const { container } = render(
      <UserContext.Provider value={{
        user: null,
        handleLogin: jest.fn()
      }}>
        <LoginPage/>
      </UserContext.Provider>
    )

    // screen.debug()

    const preTag = container.querySelector('pre')
    expect(preTag.innerHTML).toBe('')

  })

  test('Debe de mostrar el componente con el usuario', () => {

    const user: UserContextProps = {
      name: 'Arian Angoma',
      email: 'arian.angoma.js@gmail.com'
    }

    const { container } = render(
      <UserContext.Provider value={{
        user,
        handleLogin: jest.fn()
      }}>
        <LoginPage/>
      </UserContext.Provider>
    )

    // screen.debug()

    const preTag = container.querySelector('pre')
    expect(preTag.innerHTML).toBe(JSON.stringify(user, null, 3))

  })

  test('Debe de llamar al handleLogin y establecer el usuario', () => {

    const handleLoginMock = jest.fn()

    render(
      <UserContext.Provider value={{
        user: null,
        handleLogin: handleLoginMock
      }}>
        <LoginPage/>
      </UserContext.Provider>
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleLoginMock).toHaveBeenCalled()
    expect(handleLoginMock).toHaveBeenCalledTimes(1)
    expect(handleLoginMock).toHaveBeenCalledWith({
      name: 'Arian Angoma',
      email: 'arian.angoma.js@gmail.com'
    })

  })

})
