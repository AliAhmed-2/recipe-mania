import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from '~/components';

describe('Input Component', () => {
  test('renders the input with correct label and placeholder', () => {
    render(
      <Input
        label="Username"
        placeholder="Enter your username"
        name="username"
      />,
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your username'),
    ).toBeInTheDocument();
  });

  test('applies the correct size class based on size prop', () => {
    render(
      <Input
        label="Email"
        size="large"
        name="email"
      />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('p-4 text-lg');
  });

  test('applies default size class when size prop is not provided', () => {
    render(
      <Input
        label="Email"
        name="email"
      />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('p-3 text-md w-full');
  });

  test('displays error message when error prop is provided', () => {
    render(
      <Input
        label="Password"
        name="password"
        error="Password is required"
      />,
    );
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  test('calls register function to register input component', () => {
    const mockRegister = vi.fn();
    render(
      <Input
        label="Username"
        name="username"
        register={mockRegister}
      />,
    );
    expect(mockRegister).toHaveBeenCalledWith('username', {
      required: 'username is required',
    });
  });

  test('renders the correct input type based on type prop', () => {
    render(
      <Input
        label="Email"
        name="email"
        type="email"
      />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  test('default is text input type when type prop is not provided', () => {
    render(
      <Input
        label="Username"
        name="username"
      />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
  });
});
