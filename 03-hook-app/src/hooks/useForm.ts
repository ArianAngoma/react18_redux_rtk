import React, { useState } from 'react'

/* type UseFormResponse<T> = T & {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} */

type FormState<T> = T

type UseFormResponse<T> = FormState<T> & {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/* interface UseFormResponse<T> {
  formState: T;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} */

const useForm = <T> (initialForm: T): UseFormResponse<T> => {

  const [formState, setFormState] = useState<T>(initialForm)

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {

    setFormState(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))

  }

  return {
    ...formState,
    handleInputChange
  }

}

export default useForm
