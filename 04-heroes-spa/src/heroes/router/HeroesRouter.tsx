import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Navbar } from '../../ui'

const HeroesRouter: FC = () => {

  return (
    <>

      <Navbar/>

      <div className="container">

        <Outlet/>

      </div>

    </>
  )

}

export default HeroesRouter
