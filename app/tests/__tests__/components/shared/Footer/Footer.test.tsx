import { render, screen } from '@testing-library/react';
import { Footer } from '~/components';
import '@testing-library/jest-dom';

describe('Footer Component', () => {
  test('renders the footer component with heading and logo', () => {
    render(<Footer />);

    const heading = screen.getAllByRole('heading')[0];
    expect(heading).toHaveTextContent('Recipe Mania');

    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });

  test('renders the correct number of footer menus', () => {
    render(<Footer />);

    const footerMenus = screen.getAllByTestId('footer-menu');
    expect(footerMenus).toHaveLength(3);
  });

  test('renders the correct number of footer menus', () => {
    render(<Footer />);

    const footerMenus = screen.getAllByTestId('footer-menu');
    expect(footerMenus).toHaveLength(3);
  });
});
