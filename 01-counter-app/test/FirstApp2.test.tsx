import { render, screen } from '@testing-library/react'
import { FirstApp } from '../src/FirstApp'

describe('Tests in <FirstApp />', () => {

  const title = 'Hello, I am a title'
  const subtitle = 'Hello, I am a subtitle'

  test('Should must match with the snapshot', () => {
    const { container } = render(<FirstApp title={title}/>)

    expect(container).toMatchSnapshot()
  })

  test('Should show the title "Hello, I am a title"', () => {
    render(<FirstApp title={title}/>)
    expect(screen.getAllByText(title)).toBeTruthy()
  })

  test('Should show the title in a h1', () => {
    render(<FirstApp title={title}/>)

    expect(screen.getByRole('heading', {level: 1}).innerHTML).toContain(title)
  })

  test('Should show the subtitle from props', () => {
    render(<FirstApp title={title} subTitle={subtitle}/>)

    expect(screen.getAllByText(subtitle)).toBeTruthy()
    expect(screen.getAllByText(subtitle).length).toBe(2)
  })

})
