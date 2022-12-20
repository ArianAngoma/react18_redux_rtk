import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'

import App from '../../App'
import PostList from '../posts/PostList'
import AddPostForm from '../posts/AddPostForm'
import SinglePostPage from '../posts/SinglePostPage'

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
        path: 'posts',
        children: [
          {
            index: true,
            element: <AddPostForm/>,
          },
          {
            path: ':postId',
            element: <SinglePostPage/>,
          }
        ]
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
