import { FC } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'

const PostList: FC = () => {

  const posts = useAppSelector(state => state.posts)

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map(post => (
    <article key={post.id}>

      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>

      <p className="postCredit">
        <PostAuthor userId={post.userId}/>
        <TimeAgo timestamp={post.date}/>
      </p>

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