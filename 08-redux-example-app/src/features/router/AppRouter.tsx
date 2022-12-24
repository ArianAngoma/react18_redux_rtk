import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom'

import App from '../../App'
import PostList from '../posts/PostList'
import AddPostForm from '../posts/AddPostForm'
import SinglePostPage from '../posts/SinglePostPage'
import EditPostForm from '../posts/EditPostForm'
import UsersList from '../users/UsersList'
import UserPage from '../users/UserPage'

export const routerObject: RouteObject[] = [
  {
    path: '/',
    element: <App/>,
    children: [
      {
        index: true,
        element: <PostList/>
      },
      {
        path: 'post',
        children: [
          {
            index: true,
            element: <AddPostForm/>,
          },
          {
            path: ':postId',
            element: <SinglePostPage/>,
          },
          {
            path: 'edit/:postId',
            element: <EditPostForm/>,
          }
        ]
      },
      {
        path: 'user',
        children: [
          {
            index: true,
            element: <UsersList/>,
          },
          {
            path: ':userId',
            element: <UserPage/>,
          }
        ]
      },
      {
        path: '*',
        // Catch all route - replace with 404 page if you want
        element: <Navigate to={'/'} replace/>
      }
    ]
  }
]

const rootRoutes = createBrowserRouter(routerObject)

const AppRouter = () => {
  return (
    <RouterProvider router={rootRoutes}/>
  )
}

export default AppRouter
