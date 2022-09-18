import { render } from '@testing-library/react'
import { FirstApp } from '../src/FirstApp'

describe('Tests in <FirstApp />', () => {

  test('Should must match with the snapshot', () => {
    const title = 'Hello, I am a title'
    const {container} = render(<FirstApp title={title}/>)

    expect(container).toMatchSnapshot()
  })

  test('Should show the title in a h1', () => {
    const title = 'Hello, I am a title'
    const {container, getByText} = render(<FirstApp title={title}/>)

    expect(getByText(title)).toBeTruthy()

    const h1 = container.querySelector('h1')
    expect(h1.innerHTML).toBe(title)
    expect(h1.innerHTML).toContain(title)
  })

})
