import { FC, useMemo } from 'react'
import { getHeroesByPublisher } from '../helpers'
import HeroCard from './HeroCard'

interface HeroListProps {
  publisher: string
}

const HeroList: FC<HeroListProps> = ({ publisher }) => {

  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher])

  return (
    <div className="row rows-cols-1 row-cols-md-3 g-3">

      {

        heroes.map((/* {
          id,
          superhero,
          first_appearance,
          characters,
          publisher,
          alter_ego
        } */ hero) => (

          <HeroCard
            key={hero.id}
            /* key={id}
            id={id}
            superhero={superhero}
            publisher={publisher}
            alter_ego={alter_ego}
            first_appearance={first_appearance}
            characters={characters} */
            {...hero}
          />

        ))

      }

    </div>
  )

}

export default HeroList
