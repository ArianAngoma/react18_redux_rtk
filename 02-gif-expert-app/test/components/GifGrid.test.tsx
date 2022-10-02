import { render, screen } from '@testing-library/react'
import { GifGrid } from '../../src/components'

describe('Pruebas en <GifGrid />', () => {

  const category = 'One Punch'

  test('Debe de mostrar el loading correctamente', () => {

    render(<GifGrid category={category}/>)

    // screen.debug()

    expect(screen.getByText('Loading...'))
    expect(screen.getByText(category))

  })

  test('Debe de mostrar items cuando se cargan imágenes useFetchGifs', () => {



  })

})
