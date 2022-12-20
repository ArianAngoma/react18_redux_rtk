
import { Outlet } from 'react-router-dom'

import Counter from './features/counter/Counter'
import PostList from './features/posts/PostList'
import AddPostForm from './features/posts/AddPostForm'
import { fetchUsers } from './features/users/usersSlice'
import { store } from './app/store'

store.dispatch(fetchUsers())

function App () {

  return (
    <main className="App">

      {/* <Counter/> */}

      {/* <AddPostForm/> */}

      {/* <PostList/> */}

      <Outlet/>

    </main>
  )
}

export default App
