import { getImagen } from '../../src/base-pruebas/11-async-await'

describe('Tests in 11-async-await.test.ts', () => {

  test('getImagen should return an url', async () => {

    const url = await getImagen()
    expect(url.includes('https://')).toBe(true)

  })

})
