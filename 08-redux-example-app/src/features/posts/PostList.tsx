import { FC, useEffect } from 'react'

import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { fetchPosts } from './postSlice'

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
    <article key={post.id}>

      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>

      <p className="postCredit">
        <PostAuthor userId={post.userId}/>
        <TimeAgo timestamp={post.date}/>
      </p>

      <ReactionButtons post={post}/>

    </article>
  ))

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )

}

export default PostList
