import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import UserProvider from './context/UserProvider'

const MainApp = () => {
  return (
    <UserProvider>

      <Navbar/>

      <hr/>

      <Outlet/>

    </UserProvider>
  )
}

export default MainApp
