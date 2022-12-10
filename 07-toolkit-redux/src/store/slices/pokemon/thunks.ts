import { AnyAction, ThunkAction } from '@reduxjs/toolkit'

import { RootState } from '../../config'
import { ResponsePokemon, setPokemons, startLoadingPokemons } from './pokemonSlice'
import { pokemonApi } from '../../../api'

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>

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
