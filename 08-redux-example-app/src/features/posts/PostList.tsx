import { FC } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import PostAuthor from './PostAuthor'

const PostList: FC = () => {

  const posts = useAppSelector(state => state.posts)

  const renderedPosts = posts.map(post => (
    <article key={post.id}>

      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>

      <p className="postCredit">
        <PostAuthor userId={post.userId} />
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
