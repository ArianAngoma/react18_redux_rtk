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

})
