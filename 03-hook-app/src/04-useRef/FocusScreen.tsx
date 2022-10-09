import { useCallback, useRef } from 'react'

const FocusScreen = () => {

  const inputRef = useRef<HTMLInputElement>(null)

  const onClickBtn = useCallback(() => {
    inputRef.current?.select()
  }, [])

  return (
    <>
      <h1>Focus Screen</h1>
      <hr/>

      <input
        ref={inputRef}
        type="text"
        className="form-control"
        placeholder="Su nombre"
      />

      <button
        className="btn btn-outline-primary mt-5"
        onClick={onClickBtn}
      >
        Set Focus
      </button>
    </>
  )

}

export default FocusScreen
