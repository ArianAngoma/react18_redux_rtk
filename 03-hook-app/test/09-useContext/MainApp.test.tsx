import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import MainApp from '../../src/09-useContext/MainApp'

describe('Pruebas en <MainApp/>', () => {

  test('Debe de mostrar el Home', () => {

    render(
      <MemoryRouter initialEntries={['/']}>
        <MainApp/>
      </MemoryRouter>
    )

    expect(screen.getByText('Home')).toBeTruthy()

  })

  test('Debe de mostrar el Login', () => {

    render(
      <MemoryRouter initialEntries={['/login']}>
        <MainApp/>
      </MemoryRouter>
    )


    expect(screen.getByText('Login')).toBeTruthy()

    const linkTag = screen.getByRole('link', {name: 'Login'})
    expect(linkTag).toBeTruthy()
    expect(linkTag.className).toContain('active')

  })

})
