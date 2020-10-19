import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValue] = useState(initialState);

  const onChange = ({ target }) => {
    setValue({ ...values, [target.name]: target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
