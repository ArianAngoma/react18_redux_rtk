import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import AppRouter from './features/router/AppRouter'
import { persistor, store } from './app/store'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // ToDo: A condition had to be added in the asyncThunk fetchPosts because if the reducer is not added it is executed twice and added twice to the status and shows a duplicate key warning in the list of posts. Another solution is to remove the StrictMode
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter/>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
