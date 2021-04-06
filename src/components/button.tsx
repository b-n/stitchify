import React from 'react';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={() => { onClick() }}
    >
      {label}
    </button>
  )
}

export default Button;
