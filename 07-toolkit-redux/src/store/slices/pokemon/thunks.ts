import { ResponsePokemon, setPokemons, startLoadingPokemons } from './pokemonSlice'
import { pokemonApi } from '../../../api'
import { AppThunk } from '../../config'

interface GetPokemonsArgs {
  page: number;
}

export const getPokemons = ({ page }: GetPokemonsArgs): AppThunk => {
  return async (dispatch, getState, extraArgument) => {

    dispatch(startLoadingPokemons())

    const { data } = await pokemonApi.get<ResponsePokemon>(`/pokemon?limit=10&offset=${page * 10}`)

    dispatch(setPokemons({
      pokemons: data.results,
      page: page + 1
    }))

  }
}
