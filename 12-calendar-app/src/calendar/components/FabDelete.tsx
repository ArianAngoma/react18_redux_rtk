import { FC } from 'react'
import { useDeleteEventMutation } from '../../store'
import { useUIStore } from '../../hooks'

const FabDelete: FC = () => {

  const { activeEvent, onClearActiveEvent } = useUIStore()
  const [ onDeleteEvent, { isLoading } ] = useDeleteEventMutation()

  const onClick = async () => {
    if (activeEvent?.id) {

      await onDeleteEvent({
        id: activeEvent.id
      }).unwrap()

      onClearActiveEvent()

    }
  }

  return (
    <button
      className="btn btn-danger fab-danger"
      style={{
        display: activeEvent?.id ? '' : 'none'
      }}
      onClick={onClick}
      disabled={isLoading}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  )

}

export default FabDelete