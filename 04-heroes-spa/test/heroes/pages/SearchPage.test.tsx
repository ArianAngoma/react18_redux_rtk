import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { SearchPage } from '../../../src/heroes'

describe('Pruebas en <SearchPage />', () => {

  test('Debe de mostrarse correctamente con valores por defecto', () => {

    const router = createMemoryRouter(
      [
        {
          path: '/search',
          element: <SearchPage/>,
        }
      ],
      {
        initialEntries: ['/search'],
      }
    )

    const { container } = render(<RouterProvider router={router}/>)

    // screen.debug()

    expect(container).toMatchSnapshot()

  })

  test('Debe de mostrar a Batman y el input con el valor del query string', () => {

    const router = createMemoryRouter(
      [
        {
          path: '/search',
          element: <SearchPage/>,
        }
      ],
      {
        initialEntries: ['/search?q=batman'],
      }
    )

    render(<RouterProvider router={router}/>)

    // screen.debug()

    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('batman')

    const image = screen.getByRole('img') as HTMLImageElement
    expect(image.src).toContain('/assets/dc-batman.jpg')

  })

  test('Debe de mostrar un error si no se encuentra el hero', () => {

    const router = createMemoryRouter(
      [
        {
          path: '/search',
          element: <SearchPage/>,
        }
      ],
      {
        initialEntries: ['/search?q=error-hero'],
      }
    )

    const { container } = render(<RouterProvider router={router}/>)

    // screen.debug()

    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('error-hero')

    const alert = container.querySelector('.alert-danger')
    expect(alert).toBeTruthy()
    expect(alert?.textContent).toBe('There is no a hero with error-hero')

  })

})
