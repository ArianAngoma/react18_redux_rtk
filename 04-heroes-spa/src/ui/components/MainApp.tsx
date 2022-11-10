import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from './Navbar'

const MainApp: FC = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default MainApp
