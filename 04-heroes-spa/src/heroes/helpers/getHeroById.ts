import heroes from '../data/heroes'

export const getHeroById = (id: string | undefined) => {
  return heroes.find((hero) => hero.id === id)
}
