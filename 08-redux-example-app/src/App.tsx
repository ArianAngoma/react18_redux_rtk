import Counter from './features/counter/Counter'
import PostList from './features/posts/PostList'
import AddPostForm from './features/posts/AddPostForm'

function App () {
  return (
    <main className="App">

      {/* <Counter/> */}

      <AddPostForm/>

      <PostList/>

    </main>
  )
}

export default App
