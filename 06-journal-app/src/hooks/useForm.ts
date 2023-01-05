import React, { useEffect, useState } from 'react'

/* type UseFormResponse<T> = T & {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} */

type FormState<T> = T

type FormCheckedValues<T> = Record<`${string & keyof T}Valid`, string | null>

type UseFormResponse<T> = FormState<T> & {
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onResetForm: () => void;
} & FormCheckedValues<T>

/* interface UseFormResponse<T> {
  formState: T;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} */

type FormValidations<T> = {
  [K in keyof T]?: [(value: T[K]) => boolean, string]
}

const useForm = <T> (initialForm: T, formValidations?: FormValidations<T>): UseFormResponse<T> => {

  const [formState, setFormState] = useState<T>(initialForm)
  const [formValidation, setFormValidation] = useState<FormCheckedValues<T>>({} as FormCheckedValues<T>)

  useEffect(() => {
    createValidators()
  }, [formState])

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {

    setFormState(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))

  }

  const onResetForm = () => setFormState(initialForm)

  const createValidators = () => {

    if (formValidations) {
      
      const formCheckedValues = {} as FormCheckedValues<T>

      for (const formField in formValidations) {

        if (formValidations.hasOwnProperty(formField)) {

          const validationArray = formValidations[formField]
         
          if (validationArray) {

            const [fn, errorMessage] = validationArray

            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage

          }

        }

      }

      setFormValidation(formCheckedValues)

    }

  } 

  return {
    ...formState,
    onInputChange,
    onResetForm,
    ...formValidation
  }

}

export default useForm
