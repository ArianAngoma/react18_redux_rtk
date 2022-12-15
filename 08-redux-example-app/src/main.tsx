import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './app/store'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // ToDo: A condition had to be added in the asyncThunk fetchPosts because if the reducer is not added it is executed twice and added twice to the status and shows a duplicate key warning in the list of posts. Another solution is to remove the StrictMode
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
)
