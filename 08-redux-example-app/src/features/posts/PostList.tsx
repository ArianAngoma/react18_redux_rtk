import { FC, useEffect } from 'react'

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

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map(post => (
    <PostExcerpt
      key={post.id}
      post={post}
    />
  ))

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )

}

export default PostList
