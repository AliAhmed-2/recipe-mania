import React from 'react';
import { Input } from '~/components';
import { EditableProfileFieldProps } from './types';

export const EditableProfileField: React.FC<EditableProfileFieldProps> = ({
  editMode,
  label,
  value,
  register,
  error,
  name,
}) => {
  return (
    <div className="flex justify-between">
      <p className="opacity-55">{label}</p>
      {editMode ? (
        <Input
          size="small"
          defaultValue={value}
          containerClass="!mb-0 !w-64"
          inputClass="text-right font-medium text-black opacity-70"
          register={register}
          error={error}
          name={name}
        />
      ) : (
        <p className="font-medium opacity-70">{value}</p>
      )}
    </div>
  );
};
