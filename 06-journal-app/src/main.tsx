import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles.css'

import JournalApp from './JournalApp'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <JournalApp/>
  </React.StrictMode>
)
