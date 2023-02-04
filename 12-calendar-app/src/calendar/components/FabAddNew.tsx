import { FC } from 'react'

import { useUIStore } from '../../hooks'

const FabAddNew: FC = () => {

  const { onOpenDateModal, onSetActiveEvent } = useUIStore()

  const onClickNew = () => {
    onSetActiveEvent({
      title: '',
      note: '',
      start: new Date(),
      end: new Date(),
      bgColor: '#000',
      user: {
        id: '',
        name: ''
      }
    })
    onOpenDateModal()
  }

  return (
    <button
      className="btn btn-primary fab"
      onClick={onClickNew}
    >
      <i className="fas fa-plus"></i>
    </button>
  )

}

export default FabAddNew