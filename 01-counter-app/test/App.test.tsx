import { render, screen } from '@testing-library/react'
import App from '../src/App'

describe('Tests in <App />', () => {

  const initialCounter = 100

  test('should show <App /> correctly', () => {

    const {container} = render(<App value={initialCounter}/>)
    expect(container).toMatchSnapshot()

  })

  test('Should show initial value from props', () => {
    render(<App value={initialCounter}/>)

    expect(screen.getByText(initialCounter)).toBeTruthy()
    expect(screen.getByRole('heading', {level: 2}).innerHTML).toContain(`${initialCounter}`)

  })

})
