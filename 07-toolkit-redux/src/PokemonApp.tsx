import { FC, useEffect } from 'react'
import { getPokemons, useAppDispatch, useAppSelector } from './store'

const PokemonApp: FC = () => {

  const {
    isLoading,
    pokemons,
    page
  } = useAppSelector(state => state.pokemon)

  const dispatch = useAppDispatch()

  useEffect(() => {

    dispatch(getPokemons({ page: 0 }))

  }, [])

  return (
    <>
      <h1>Pokemon App</h1>
      <hr/>

      <span>Loading: {isLoading ? 'True' : 'False'}</span>

      <ul>
        {

          pokemons.map((pokemon) => (
            <li key={pokemon.url}>
              {pokemon.name}
            </li>
          ))

        }
      </ul>

      <button
        disabled={isLoading}
        onClick={() => dispatch(getPokemons({ page }))}
      >
        Next Page
      </button>
    </>
  )

}

export default PokemonApp
