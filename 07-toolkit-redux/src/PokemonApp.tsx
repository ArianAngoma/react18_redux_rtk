import { FC, useEffect } from 'react'
import { getPokemons, useAppDispatch } from './store'

const PokemonApp: FC = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {

    dispatch(getPokemons({ page: 0 }))

  }, [])

  return (
    <>
      <h1>Pokemon App</h1>
      <hr/>

      <ul>
        <li>Hola</li>
        <li>Hola</li>
        <li>Hola</li>
        <li>Hola</li>
      </ul>
    </>
  )

}

export default PokemonApp
