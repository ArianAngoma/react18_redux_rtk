import { Outlet } from 'react-router-dom'

const MainApp = () => {
  return (
    <>

      <h1>Main App</h1>
      <hr/>

      <Outlet/>

    </>
  )
}

export default MainApp
