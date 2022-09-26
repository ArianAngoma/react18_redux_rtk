import { render, screen } from '@testing-library/react'
import GifItem from '../../src/components/GifItem'

describe('Test in component <GifItem/>', () => {

  const id = 'id'
  const title = 'A title'
  const url = 'https://localhost/algo.jpg'

  test('Should match with snapshot', () => {

    const { container } = render(<GifItem id={id} title={title} url={url}/>)

    expect(container).toMatchSnapshot()

  })

  test('Should how the image with the ALT', () => {
    render(<GifItem id={id} title={title} url={url}/>)
    // screen.debug()

    const {
      src,
      alt
    } = screen.getByRole('img') as HTMLImageElement

    expect(src).toBe(url)
    expect(alt).toBe(title)
  })

  test('Should have the title like a text', () => {

    render(<GifItem id={id} title={title} url={url}/>)

    const titleElement = screen.getByText(title)

    expect(titleElement).toBeTruthy()

  })

})
