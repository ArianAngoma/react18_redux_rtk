import { FC, memo } from 'react'

interface ShowIncrementProps {
  increment: (value: number) => void
}

const ShowIncrement: FC<ShowIncrementProps> = ({ increment }) => {

  return (
    <button
      className={'btn btn-primary'}
      onClick={() => {
        increment(5)
      }}
    >
      Incrementar
    </button>
  )

}

export default memo(ShowIncrement)
