import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PokemonState {
  page: number
  pokemons: any[]
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
    setPokemons: (state, action: PayloadAction<any[]>) => {
      console.log(action)
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  startLoadingPokemons,
  setPokemons
} = pokemonSlice.actions

// export default counterSlice.reducer
