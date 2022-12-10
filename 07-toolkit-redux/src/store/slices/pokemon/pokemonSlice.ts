import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Result {
  name: string;
  url: string;
}

export interface ResponsePokemon {
  count: number;
  next: string;
  previous: string | null;
  results: Result[];
}

export interface PokemonState {
  page: number
  pokemons: Result[]
  isLoading: boolean

}

const initialState: PokemonState = {
  page: 0,
  pokemons: [],
  isLoading: false
}

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    startLoadingPokemons: (state) => {
      state.isLoading = true
    },
    setPokemons: (state, action: PayloadAction<Pick<PokemonState, 'page' | 'pokemons'>>) => {
      state.isLoading = false
      state.page = action.payload.page
      state.pokemons = action.payload.pokemons
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  startLoadingPokemons,
  setPokemons
} = pokemonSlice.actions

// export default counterSlice.reducer
