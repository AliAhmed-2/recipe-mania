export interface ButtonProps {
  type?: 'primary' | 'secondary';
  buttonText: string | React.ReactNode;
  onClick?: () => void;
  submit?: boolean;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}
