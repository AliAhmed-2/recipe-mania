import { UseFormRegister } from 'react-hook-form';

export interface InputProps {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  size?: 'small' | 'medium' | 'large';
  error?: string;
  defaultValue?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  containerClass?: string;
  inputClass?: string;
}
