import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Logo } from '~/components';

describe('Logo Component', () => {
  test('renders the logo with default size', () => {
    render(<Logo />);
    const logo = screen.getByTestId('logo');

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass('w-16 h-16');
  });

  test('applies correct size class for size="sm"', () => {
    render(<Logo size="sm" />);
    const logo = screen.getByTestId('logo');

    expect(logo).toHaveClass('w-16 h-16');
  });

  test('applies correct size class for size="md"', () => {
    render(<Logo size="md" />);
    const logo = screen.getByTestId('logo');

    expect(logo).toHaveClass('w-20 h-20');
  });

  test('applies correct size class for size="lg"', () => {
    render(<Logo size="lg" />);
    const logo = screen.getByTestId('logo');

    expect(logo).toHaveClass('w-40 h-40');
  });

  test('applies additional className if provided', () => {
    render(<Logo className="rounded-full" />);
    const logo = screen.getByTestId('logo');

    expect(logo).toHaveClass('rounded-full');
  });
});
