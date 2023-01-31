import { ChangeEvent, FC, useState } from 'react'

import Modal from 'react-modal'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { addHours, differenceInSeconds } from 'date-fns'

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

interface FormValues {
  title: string
  notes: string
  start: Date
  end: Date
}

const initFormValues: FormValues = {
  title: '',
  notes: '',
  start: new Date(),
  end: addHours(new Date(), 2)
}

const CalendarModal: FC = () => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(true)

  const [formValues, setFormValues] = useState<FormValues>(initFormValues)

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChange = (
    event: Date | null,
    changing: 'start' | 'end'
  ) => {
    if (!event) return
    setFormValues((prev) => ({ ...prev, [changing]: event }))
  }
  

  const onCloseModal = () => {
    console.log('close modal')
    setIsModalOpen(false)
  }

  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const difference = differenceInSeconds(formValues.end, formValues.start)

    if (isNaN(difference) || difference <= 0) return

    if (formValues.title.length <= 0) return

    console.log(formValues)
    

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
      
      <h1> New event </h1>
      <hr />
      <form
        className="container"
        onSubmit={onSubmit}
      >

          <div className="form-group mb-2">
              <label>Start date and time</label>
              <DatePicker
                selected={formValues.start}
                onChange={date => onDateChange(date, 'start')}
                className='form-control'
                dateFormat="Pp"
                showTimeSelect
              />
          </div>

          <div className="form-group mb-2">
              <label>End date and time</label>
              <DatePicker
                minDate={formValues.start}
                selected={formValues.end}
                onChange={date => onDateChange(date, 'end')}
                className='form-control'
                dateFormat="Pp"
                showTimeSelect
              />
          </div>

          <hr />
          <div className="form-group mb-2">
              <label>Tittle and note</label>
              <input 
                  type="text" 
                  className="form-control"
                  placeholder="Título del evento"
                  name="title"
                  autoComplete="off"
                  value={formValues.title}
                  onChange={onInputChange}
              />
              <small id="emailHelp" className="form-text text-muted">A short description</small>
          </div>

          <div className="form-group mb-2">
              <textarea 
                  className="form-control"
                  placeholder="Notas"
                  rows={5}
                  name="notes"
                  value={formValues.notes}
                  onChange={onInputChange}
              ></textarea>
              <small id="emailHelp" className="form-text text-muted">Additional information</small>
          </div>

          <button
              type="submit"
              className="btn btn-outline-primary btn-block"
          >
              <i className="far fa-save"></i>
              <span> Save</span>
          </button>

      </form>

    </Modal>
  )

}

export default CalendarModal