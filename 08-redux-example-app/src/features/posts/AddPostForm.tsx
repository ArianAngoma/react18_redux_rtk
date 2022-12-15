import { FC, useState, ChangeEvent } from 'react'

import { useAppDispatch } from '../hooks/useAppDispatch'
import { postAdded } from './postSlice'
import { useAppSelector } from '../hooks/useAppSelector'

const AddPostForm: FC = () => {

  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [userId, setUserId] = useState<string>('')

  const dispatch = useAppDispatch()
  const users = useAppSelector(state => state.users)

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const onBodyChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)
  const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value)

  const onSavePostClicked = () => {

    if (title && body) {

      dispatch(
        postAdded({
          title,
          body,
          userId,
        })
      )

      setTitle('')
      setBody('')
      setUserId('')
    }

  }

  const canSave = Boolean(title) && Boolean(body) && Boolean(userId)

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

      <h2>Add a New Post</h2>

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
          value={userId}
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postBody">Content:</label>
        <textarea
          id="postBody"
          name="postBody"
          value={body}
          onChange={onBodyChanged}
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

export default AddPostForm
