import { Link } from '@remix-run/react';
import { LogoProps } from './types';

export const Logo: React.FC<LogoProps> = ({ size = 'sm', className = '' }) => {
  const getLogoSize = () => {
    if (size === 'sm') return 'w-16 h-16';
    else if (size === 'md') return 'w-20 h-20';
    else return 'w-40 h-40';
  };
  return (
    <Link
      to={'/'}
      prefetch="intent"
    >
      <img
        src="/images/logo/logo.png"
        data-testid="logo"
        className={`${getLogoSize()} ${className}`}
      />
    </Link>
  );
};
