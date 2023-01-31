import { FC, useState } from 'react'

import Modal from 'react-modal'

const customStyles: Modal.Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
}

Modal.setAppElement('#root')

const CalendarModal: FC = () => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(true)

  const onCloseModal = () => {
    console.log('close modal')
    setIsModalOpen(false)
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1>Helo</h1>
    </Modal>
  )

}

export default CalendarModal