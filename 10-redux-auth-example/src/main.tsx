import React from 'react'
import ReactDOM from 'react-dom/client'

import AppRouter from './router/AppRouter'
import { Provider } from 'react-redux'
import { store } from './app/store'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  </React.StrictMode>,
)
