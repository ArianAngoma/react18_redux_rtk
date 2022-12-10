import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'

import './index.css'

import App from './App'
import PokemonApp from './PokemonApp'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>

      {/* <App/> */}

      <PokemonApp/>

    </Provider>
  </React.StrictMode>
)
