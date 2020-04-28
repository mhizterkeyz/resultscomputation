import React from 'react';

const InputFormGroup = ({
  cols = '',
  feedback,
  value,
  onChange,
  placeholder,
  name,
  type = 'text',
  valid,
  required = false,
}) => ( 
  <div className={cols + " form-group"}>
    <input className={valid? "form-control is-valid": valid === null? "form-control":"form-control is-invalid"} onChange={onChange} value={value} type={type} name={name} placeholder={placeholder} required={required}/>
    <div className={valid? "valid-feedback": valid == null? "d-none":"invalid-feedback"}>
      {feedback}
    </div>
  </div>
);

export default InputFormGroup;