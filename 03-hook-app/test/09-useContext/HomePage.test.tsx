import { render } from '@testing-library/react'
import HomePage from '../../src/09-useContext/HomePage'
import UserContext, { UserContextProps } from '../../src/09-useContext/context/UserContext'

describe('Pruebas en <HomePage />', () => {

  const user: UserContextProps = {
    name: 'Arian',
    email: 'arian.angoma.js@gmail.com'
  }

  test('Debe de mostrar el componente sin el usuario', () => {

    const { container } = render(
      <UserContext.Provider value={{
        user: null,
        handleLogin: jest.fn()
      }}>
        <HomePage/>
      </UserContext.Provider>
    )

    const preTag = container.querySelector('pre')
    expect(preTag.innerHTML).toBe('')

  })

  test('Debe de mostrar el componente con el usuario', () => {

    const { container } = render(
      <UserContext.Provider value={{
        user,
        handleLogin: jest.fn()
      }}>
        <HomePage/>
      </UserContext.Provider>
    )

    const preTag = container.querySelector('pre')
    expect(preTag.innerHTML).toBe(JSON.stringify(user, null, 3))

  })

})
