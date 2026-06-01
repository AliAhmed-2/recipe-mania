import { Link } from '@remix-run/react';
import { FooterMenuProps } from './types';

export const FooterMenu: React.FC<FooterMenuProps> = ({
  title,
  menuItems,
  searchParam,
}) => {
  return (
    <div
      className="flex flex-col gap-2"
      data-testid="footer-menu"
    >
      <h4 className="font-medium">{title}</h4>
      <ul className="flex flex-col gap-1">
        {menuItems.map((item, index) => {
          return (
            <Link
              className="text-sm font-light opacity-70 transition-colors hover:text-primary-800"
              key={`${item.label}-${index}`}
              to={`/search?${searchParam}=${item.value}`}
            >
              {item.label}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
