import { Link } from '@remix-run/react';
import { Logo } from '../Logo';
import { Toolbar } from './Toolbar';
import { User } from '~/interfaces';

export const Header = ({ user }: { user: User | null }) => {
  return (
    <header
      id="header"
      data-testid="header"
      className="flex items-center justify-between border-b bg-white px-20 py-4 text-black"
    >
      <Logo />
      <nav
        id="navigation"
        className="hidden items-center justify-center gap-12 sm:flex"
      >
        <Link
          to={'/search'}
          className="transition-colors hover:text-primary-800"
        >
          Recipes
        </Link>
        <Link
          className="transition-colors hover:text-primary-800"
          to={'/search'}
        >
          Browse
        </Link>
        <Link
          className="transition-colors hover:text-primary-800"
          to={user ? '/favorites' : '/login'}
        >
          Favorites
        </Link>
        <Link
          className="transition-colors hover:text-primary-800"
          to={'/#recipe-of-the-week'}
        >
          Recipe of Week
        </Link>
      </nav>
      <Toolbar user={user} />
    </header>
  );
};
