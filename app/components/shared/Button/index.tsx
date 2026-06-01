import React from 'react';
import { ButtonProps } from './types';
import ClipLoader from 'react-spinners/ClipLoader';

export const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  buttonText,
  onClick,
  className = '',
  loading,
  submit = false,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-4 py-2 focus:outline-none ${getTypeStyling(type)} ${className} ${loading || disabled ? 'opacity-50' : ''}`}
      type={submit ? 'submit' : 'button'}
      disabled={loading || disabled}
    >
      {loading ? (
        <ClipLoader
          size={25}
          color="white"
        />
      ) : (
        buttonText
      )}
    </button>
  );
};

const getTypeStyling = (type: string) => {
  if (type === 'primary') {
    return 'bg-primary-500 text-white';
  } else {
    return 'bg-white text-primary-500 border border-primary-500';
  }
};
