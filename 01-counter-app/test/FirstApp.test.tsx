import { render } from '@testing-library/react'
import { FirstApp } from '../src/FirstApp'

describe('Tests in <FirstApp />', () => {

  test('Should must match with the snapshot', () => {
    const title = 'Hello, I am a title'
    render(<FirstApp title={title}/>)
  })

})
