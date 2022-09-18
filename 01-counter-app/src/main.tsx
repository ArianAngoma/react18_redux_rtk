import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { FirstApp } from './FirstApp'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <App value={0}/> */}
    <FirstApp title="Hola, soy Arian"/>
  </React.StrictMode>
)
