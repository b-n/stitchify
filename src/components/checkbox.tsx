import React from 'react';

interface CheckboxProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <>
      <label>{label}</label>
      <input
        type="checkbox"
        checked={value}
        onChange={(event) => { onChange(event.target.checked) }}
      />
    </>
  )
}

export default Checkbox;
