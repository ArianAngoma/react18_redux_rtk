import { ChangeEvent, FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'

const EditPostForm: FC = () => {

  const { postId } = useParams()
  const navigate = useNavigate()

  const post = useAppSelector(state => state.posts.posts.find(post => post.id === Number(postId)))
  const users = useAppSelector(state => state.users)

  const [title, setTitle] = useState<string | undefined>(post?.title)
  const [content, setContent] = useState<string | undefined>(post?.body)
  const [userId, setUserId] = useState<number | undefined>(post?.userId)
  const [requestStatus, setRequestStatus] = useState<'idle' | 'pending'>('idle')

  const dispatch = useAppDispatch()

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)
  const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) => setUserId(Number(e.target.value))

  const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle'

  const onSavePostClicked = async () => {

    if (canSave) {

      try {

        setRequestStatus('pending')
        dispatch().unwrap()

        setTitle('')
        setContent('')
        setUserId(undefined)
        navigate(`/post/${postId}`)

      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setRequestStatus('idle')
      }

    }

  }

  const usersOptions = users.map(user => (
    <option
      key={user.id}
      value={user.id}
    >
      {user.name}
    </option>
  ))

  return (
    <section>

      <h2>Edit Post</h2>

      <form>

        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          name="postAuthor"
          value={userId}
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />

        <button
          type="button"
          onClick={onSavePostClicked}
          disabled={!canSave}
        >
          Save Post
        </button>

      </form>

    </section>
  )

}
