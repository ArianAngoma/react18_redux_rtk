import { returnArray } from '../../src/base-pruebas/07-deses-arr'

describe('Test in 07-deses-arr', () => {

  test('should return a string and a number', () => {
    const [letters, numbers] = returnArray() // ['ABC', 123]

    expect(letters).toBe('ABC')
    expect(typeof letters).toBe('string')

    expect(numbers).toBe(123)
    expect(typeof numbers).toBe('number')

    expect(letters).toEqual(expect.any(String))
  })

})
