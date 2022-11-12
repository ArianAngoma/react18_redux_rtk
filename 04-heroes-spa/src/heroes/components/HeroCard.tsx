import { FC } from 'react'
import { Hero } from '../data/heroes'
import { Link } from 'react-router-dom'

const CharactersByHero: FC<Pick<Hero, 'characters' | 'alter_ego'>> = ({
  characters,
  alter_ego
}) => {
  if (alter_ego === characters) return null
  return <p className="card-text">{characters}</p>
}

const HeroCard: FC<Hero> = ({
  id,
  characters,
  first_appearance,
  // publisher,
  superhero,
  alter_ego
}) => {

  const heroImageUrl = `/assets/${id}.jpg`

  /* const charactersByHero = <p className="card-text">{characters}</p> */

  return (
    <div className="col animate__animated animate__fadeIn">

      <div className="card">

        <div className="row no-gutters">

          <div className="col-4">

            <img
              src={heroImageUrl}
              alt={superhero}
              className="card-img"
            />

          </div>

          <div className="col-8">

            <div className="card-body">

              <h5 className="card-title">{superhero}</h5>

              <p className="card-text">{alter_ego}</p>

              {/*
                {
                  (alter_ego !== characters) && charactersByHero
                }
              */}

              <CharactersByHero
                alter_ego={alter_ego}
                characters={characters}
              />

              <p className="card-text">
                <small className="text-muted">{first_appearance}</small>
              </p>

              <Link to={`/hero/${id}`}>
                Más...
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  )

}

export default HeroCard
