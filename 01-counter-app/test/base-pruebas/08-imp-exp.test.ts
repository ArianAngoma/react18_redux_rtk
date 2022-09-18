import { getHeroById, getHeroesByOwner } from '../../src/base-pruebas/08-imp-exp'

describe('Tests in 08-imp-exp', () => {

  test('getHeroById should return a hero by id', () => {

    const id = 1
    const hero = getHeroById(id)

    const heroData = {
      id: 1,
      name: 'Batman',
      owner: 'DC'
    }

    expect(hero).toEqual(heroData)

  })

  test('getHeroById should return undefined if hero does not exist', () => {
    const id = 100
    const hero = getHeroById(id)

    // expect(hero).toBe(undefined)
    expect(hero).toBeFalsy()
  })

  test('getHeroesByOwner should return an array with DC heroes', () => {
    const owner = 'DC'
    const heroes = getHeroesByOwner(owner)

    const heroesData = [{
      id: 1,
      name: 'Batman',
      owner: 'DC'
    }, {
      id: 3,
      name: 'Superman',
      owner: 'DC'
    }, {
      id: 4,
      name: 'Flash',
      owner: 'DC'
    }]

    expect(heroes).toEqual(heroesData)
    expect(heroes.length).toBe(3)

  })

  test('getHeroesByOwner should return an array with Marvel heroes', () => {
    const owner = 'Marvel'
    const heroes = getHeroesByOwner(owner)

    expect(heroes.length).toBe(2)

  })

})
