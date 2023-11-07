import { useState } from 'react';

const useForm = <T extends Object>(initialState: T) => {
  const [values, setValues] = useState(initialState);
  const [formError, setFormError] = useState('');

  const handleInputChange = (target: EventTarget & HTMLInputElement | EventTarget & HTMLSelectElement | EventTarget & HTMLTextAreaElement | { name: string, value: unknown }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  const reset = () => {
    setValues(initialState);
  };

  return {
    ...values,
    handleInputChange,
    reset,
    formError,
    setFormError,
  };
};

export default useForm;
