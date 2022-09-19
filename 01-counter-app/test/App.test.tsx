import { fireEvent, render, screen } from '@testing-library/react'
import App from '../src/App'

describe('Tests in <App />', () => {

  const initialCounter = 100

  test('should show <App /> correctly', () => {

    const { container } = render(<App value={initialCounter}/>)
    expect(container).toMatchSnapshot()

  })

  test('Should show initial value from props', () => {
    render(<App value={initialCounter}/>)

    expect(screen.getByText(initialCounter)).toBeTruthy()
    expect(screen.getByRole('heading', { level: 2 }).innerHTML).toContain(`${initialCounter}`)

  })

  test('Should increment counter with button +1', () => {

    render(<App value={initialCounter}/>)

    const buttonIncrement = screen.getByRole('button', { name: '+1' })
    fireEvent.click(buttonIncrement)

    expect(screen.getByText(initialCounter + 1)).toBeTruthy()
    expect(screen.getByRole('heading', { level: 2 }).innerHTML).toContain(`${initialCounter + 1}`)

  })

  test('Should decrement counter with button -1', () => {

    render(<App value={initialCounter}/>)

    const buttonDecrement = screen.getByRole('button', { name: '-1' })
    fireEvent.click(buttonDecrement)

    expect(screen.getByText(initialCounter - 1)).toBeTruthy()
    expect(screen.getByRole('heading', { level: 2 }).innerHTML).toContain(`${initialCounter - 1}`)

  })

  test('Should reset counter with button Reset', () => {

    render(<App value={initialCounter}/>)

    const buttonIncrement = screen.getByRole('button', { name: '+1' })
    fireEvent.click(buttonIncrement)
    fireEvent.click(buttonIncrement)
    fireEvent.click(buttonIncrement)

    const buttonReset = screen.getByRole('button', { name: 'Reset' })
    fireEvent.click(buttonReset)

    expect(screen.getByText(initialCounter)).toBeTruthy()
    expect(screen.getByRole('heading', { level: 2 }).innerHTML).toContain(`${initialCounter}`)

  })

})
