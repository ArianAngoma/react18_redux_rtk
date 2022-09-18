import { getHello } from '../../src/base-pruebas/02-template-string'

describe('Tests in 02-template-string', () => {

  test('Should return a string', () => {
    const name = 'Arian'
    const message = getHello(name)
    expect(message).toBe(`Hello ${name}`)
  })

})

