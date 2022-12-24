import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../features/hooks/useAppDispatch'
import { useAppSelector } from '../features/hooks/useAppSelector'
import { increaseCount } from '../features/posts/postSlice'

const Header: FC = () => {

  const dispatch = useAppDispatch()
  const count = useAppSelector(state => state.posts.count)

  return (
    <header className="Header">
      <h1>Redux Blog</h1>

      <nav>

        <ul>

          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="post">Post</Link>
          </li>

          <li>
            <Link to="user">User</Link>
          </li>

        </ul>

        <button onClick={() => {
          dispatch(increaseCount())
        }}>
          {count}
        </button>

      </nav>

    </header>
  )

}

export default Header
