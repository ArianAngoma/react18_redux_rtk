import { getHeroByIdAsync } from '../../src/base-pruebas/09-promesas'

describe('Tests in 09-promesas', () => {

  test('getHeroByIdAsync should return a hero async', (done) => {
    const id = 1
    getHeroByIdAsync(id)
      .then(hero => {

        expect(hero).toEqual({
          id: 1,
          name: 'Batman',
          owner: 'DC'
        })
        done()

      })
  })

  test('Shuld get an error if hero by id does not exist', (done) => {
    const id = 100
    getHeroByIdAsync(id)
      .catch(error => {
        expect(error).toBe('No se pudo encontrar el héroe')
        done()
      })
  })

})
