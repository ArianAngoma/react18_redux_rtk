import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react'

import Modal from 'react-modal'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import { addHours, differenceInSeconds } from 'date-fns'

import { useUIStore } from '../../hooks'
import { useAddNewEventMutation, useUpdateEventMutation } from '../../store'

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
  note: string
  bgColor: string
  start: Date
  end: Date
}

const initFormValues: FormValues = {
  title: '',
  note: '',
  bgColor: '#fafafa',
  start: new Date(),
  end: addHours(new Date(), 2)
}

const CalendarModal: FC = () => {

  const { isDateModalOpen, activeEvent, onCloseDateModal } = useUIStore()

  const [ 
    onAddNewEvent, 
    { isLoading: isLoadingAddNewEvent } 
  ] = useAddNewEventMutation()
  const [ 
    onEditEvent, 
    { isLoading: isLoadingUpdateEvent } 
  ] = useUpdateEventMutation()

  const [formValues, setFormValues] = useState<FormValues>({...initFormValues})

  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false)

  const titleClass = useMemo(() => {
    if (!isFormSubmitting) return ''
    return formValues.title.length <= 0 ? 'is-invalid' : 'is-valid'
  }, [formValues.title, isFormSubmitting])

  useEffect(() => {

    if (activeEvent) {
      setFormValues({
        title: activeEvent.title,
        note: activeEvent.note,
        start: new Date(activeEvent.start),
        end: new Date(activeEvent.end),
        bgColor: activeEvent.bgColor
      })
    }

  }, [activeEvent])

  const onInputChange = ({
    target
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const onCloseModal = () => onCloseDateModal()

  const onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsFormSubmitting(true)
    
    const difference = differenceInSeconds(formValues.end, formValues.start)

    if (isNaN(difference) || difference <= 0) {
      return Swal.fire('Error', 'End date must be greater than start date', 'error')
    }

    if (formValues.title.length <= 0) return

    if (!activeEvent?.id) {

      await onAddNewEvent({
        ...formValues,
        start: formValues.start,
        end: formValues.end,
        bgColor: formValues.bgColor,
      }).unwrap()

    } else {

      await onEditEvent({
        ...formValues,
        id: activeEvent.id,
        start: formValues.start,
        end: formValues.end,
        bgColor: formValues.bgColor,
      }).unwrap()

    }

    onCloseDateModal()
    setIsFormSubmitting(false)
    
  }

  return (
    <Modal
      isOpen={isDateModalOpen}
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

          <div className="form-group mb-2">
            <label>Color</label>
            <input
              type="color"
              className="form-control form-control-color"
              name="bgColor"
              value={formValues.bgColor}
              onChange={onInputChange}
            />
          </div>

          <hr />
          <div className="form-group mb-2">
            <label>Title and note</label>
            <input 
                type="text" 
                className={`form-control ${titleClass}`}
                placeholder="Title"
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
                placeholder="Note"
                rows={5}
                name="note"
                value={formValues.note}
                onChange={onInputChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">Additional information</small>
          </div>

          <button
              type="submit"
              className="btn btn-outline-primary btn-block"
              disabled={isLoadingAddNewEvent || isLoadingUpdateEvent}
          >
              <i className="far fa-save"></i>
              <span> Save</span>
          </button>

      </form>

    </Modal>
  )

}

export default CalendarModal