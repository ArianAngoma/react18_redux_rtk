import React, { useState } from 'react'

/* type UseFormResponse<T> = T & {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} */

type FormState<T> = T

type UseFormResponse<T> = FormState<T> & {
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onResetForm: () => void;
}


/* interface UseFormResponse<T> {
  formState: T;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} */

type FormValidations<T> = {
  [K in keyof T]?: [(value: T[K]) => boolean, string]
}

const useForm = <T> (initialForm: T, formValidations: FormValidations<T>): UseFormResponse<T> => {

  const [formState, setFormState] = useState<T>(initialForm)

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {

    setFormState(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))

  }

  const onResetForm = () => {
    setFormState(initialForm)
  }

  return {
    ...formState,
    onInputChange,
    onResetForm
  }

}

export default useForm
