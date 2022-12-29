import { FC, useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAddNewPostMutation } from './postSlice'
import { useAppSelector } from '../hooks/useAppSelector'

const AddPostForm: FC = () => {

  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [userId, setUserId] = useState<string>('')

  const [addNewPost, { isLoading }] = useAddNewPostMutation()
  const users = useAppSelector(state => state.users)

  const navigate = useNavigate()

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const onBodyChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)
  const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value)

  const canSave = [title, body, userId].every(Boolean) && !isLoading

  const onSavePostClicked = async () => {

    if (canSave) {

      try {

        await addNewPost({
          title,
          body,
          userId: Number(userId),
        }).unwrap()

        setTitle('')
        setBody('')
        setUserId('')

        navigate('/')

      } catch (err) {
        console.error('Failed to save the post: ', err)
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
