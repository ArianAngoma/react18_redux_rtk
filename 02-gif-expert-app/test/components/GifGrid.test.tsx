import { render, screen } from '@testing-library/react'
import { GifGrid } from '../../src/components'
import useFetchGifs from '../../src/hooks/useFetchGifs'

jest.mock('../../src/hooks/useFetchGifs')
const useFetchGifsMock = jest.mocked(useFetchGifs)

describe('Pruebas en <GifGrid />', () => {

  const category = 'One Punch'

  test('Debe de mostrar el loading correctamente', () => {

    useFetchGifsMock.mockReturnValue({
      gifs: [],
      isLoading: true
    })

    render(<GifGrid category={category}/>)

    // screen.debug()

    expect(screen.getByText('Loading...'))
    expect(screen.getByText(category))

  })

  test('Debe de mostrar items cuando se cargan imágenes useFetchGifs', () => {

    const gifs = [
      {
        id: 'ABC',
        url: 'https://localhost/cualquier/cosa.jpg',
        title: 'Cualquier cosa'
      },
      {
        id: '123',
        url: 'https://localhost/cualquier/cosa2.jpg',
        title: 'Cualquier cosa2'
      }
    ]

    useFetchGifsMock.mockReturnValue({
      gifs,
      isLoading: false
    })

    render(<GifGrid category={category}/>)

    // screen.debug()

    expect(screen.getAllByRole('img').length).toBe(gifs.length)

  })

})
