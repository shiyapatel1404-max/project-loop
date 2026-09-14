import { useState } from 'react'

export const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched({ ...touched, [name]: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit(values)
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return { values, errors, touched, handleChange, handleBlur, handleSubmit, reset, setValues, setErrors }
}
