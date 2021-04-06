import React from 'react';

interface TextFieldProps {
  label: string;
  value: string;
  type: string;
  onChange: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  type,
  onChange,
}) => {
  return (
    <>
      <label>{label}</label>
      <input
        type="text"
        value={value}
        html-type={type}
        onChange={(event) => { onChange(event.target.value) }}/>
    </>
  )
}

export default TextField;
