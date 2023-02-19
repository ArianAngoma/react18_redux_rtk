import { FC } from 'react'

import { addHours } from 'date-fns'

import { useUIStore } from '../../hooks'

const FabAddNew: FC = () => {

  const { onOpenDateModal, onSetActiveEvent } = useUIStore()

  const onClickNew = () => {
    onSetActiveEvent({
      title: '',
      note: '',
      start: new Date().toString(),
      end: addHours(new Date(), 2).toString(),
      bgColor: '#fafafa',
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