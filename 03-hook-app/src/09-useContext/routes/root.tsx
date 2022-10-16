import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainApp from '../MainApp'
import HomePage from '../HomePage'
import AboutPage from '../AboutPage'
import LoginPage from '../LoginPage'
import ErrorPage from '../ErrorPage'

const rootRoutes = createBrowserRouter([
  {
    path: '/',
    element: <MainApp/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: 'about',
        element: <AboutPage/>
      },
      {
        path: 'login',
        element: <LoginPage/>
      }
    ]
  }
])

const AppRouter = () => {
  return (
    <RouterProvider router={rootRoutes}/>
  )
}

export default AppRouter
