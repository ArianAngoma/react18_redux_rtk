import { AnyAction, ThunkAction } from '@reduxjs/toolkit'

import { RootState } from '../../config'
import { startLoadingPokemons } from './pokemonSlice'

interface GetPokemonsArgs {
  page: number;
}

export const getPokemons = ({ page }: GetPokemonsArgs): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState, extraArgument) => {

    dispatch(startLoadingPokemons())



  }
}
