import { UseFormRegister } from 'react-hook-form';

export interface EditableProfileFieldProps {
  editMode: boolean;
  label: string;
  value: string;
  name: string;
  error?: string;
  register?: UseFormRegister<any>;
}
