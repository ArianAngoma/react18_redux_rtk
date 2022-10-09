import { FC, memo } from 'react'

interface ShowIncrementProps {
  increment: () => void
}

const ShowIncrement: FC<ShowIncrementProps> = ({ increment }) => {

  console.log('ShowIncrement: rendered')

  return (
    <button
      className={'btn btn-primary'}
      onClick={() => {
        increment()
      }}
    >
      Incrementar
    </button>
  )

}

export default memo(ShowIncrement)
