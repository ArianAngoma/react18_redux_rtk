import { FC, useEffect, useMemo } from 'react'

import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { fetchPosts } from './postSlice'
import PostExcerpt from './PostExcerpt'

const PostList: FC = () => {

  const {
    posts,
    status,
    error
  } = useAppSelector(state => state.posts)
  const dispatch = useAppDispatch()

  useEffect(() => {

    if (status === 'idle') {
      dispatch(fetchPosts())
    }

  }, [status])

  const content = useMemo(() => {

    if (status === 'loading') {

      return <p>Loading...</p>

    } else if (status === 'succeeded') {

      const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
      return orderedPosts.map(post => (
        <PostExcerpt
          key={post.id}
          post={post}
        />
      ))

    } else if (status === 'failed') {

      return <p>{error}</p>

    }

  }, [status, posts, error])

  return (
    <section>
      {content}
    </section>
  )

}

export default PostList
