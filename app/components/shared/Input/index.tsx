import React, { useEffect } from 'react';
import { InputProps } from './types';

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  size = 'medium',
  name,
  type = 'text',
  error,
  defaultValue,
  containerClass,
  inputClass,
  register,
}) => {
  const sizeClasses = {
    small: 'p-2 text-sm',
    medium: 'p-3 text-md w-full',
    large: 'p-4 text-lg',
  };

  return (
    <div className={`mb-4 flex flex-col ${containerClass}`}>
      {label ? (
        <label
          htmlFor={name}
          className="mb-2 text-gray-600"
        >
          {label}
        </label>
      ) : null}
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...(register
          ? register(name, { required: `${name} is required` })
          : {})}
        className={`rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 ${sizeClasses[size]} ${inputClass}`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
