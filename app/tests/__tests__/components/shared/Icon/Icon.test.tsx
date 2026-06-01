import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Icon } from '~/components';

describe('Icon Component', () => {
  test('renders the icon with the correct src based on fileName', () => {
    render(<Icon fileName="settings" />);
    const img = screen.getByRole('img', { name: /settings icon/i });
    expect(img).toHaveAttribute('src', '/icons/settings.svg');
  });

  test('applies the correct size class based on size prop', () => {
    render(
      <Icon
        fileName="settings"
        size="lg"
      />,
    );
    const img = screen.getByRole('img', { name: /settings icon/i });
    expect(img).toHaveClass('h-6 w-6');
  });

  test('applies additional custom classes', () => {
    render(
      <Icon
        fileName="settings"
        className="custom-class"
      />,
    );
    const img = screen.getByRole('img', { name: /settings icon/i });
    expect(img).toHaveClass('custom-class');
  });

  test('displays tooltip on hover', async () => {
    render(
      <Icon
        fileName="settings"
        tooltip="Settings Icon"
      />,
    );
    ``;
    const iconContainer = screen.getByRole('img', {
      name: /settings icon/i,
    }).parentElement;

    fireEvent.mouseEnter(iconContainer!);
    expect(screen.getByText(/settings icon/i)).toBeInTheDocument();

    fireEvent.mouseLeave(iconContainer!);
    await waitFor(() =>
      expect(screen.queryByText(/settings icon/i)).not.toBeInTheDocument(),
    );
  });

  test('does not display tooltip when tooltip prop is absent', () => {
    render(<Icon fileName="settings" />);
    const tooltip = screen.queryByText(/settings icon/i);
    expect(tooltip).not.toBeInTheDocument();
  });

  test('applies default size class when size prop is not provided', () => {
    render(<Icon fileName="settings" />);
    const img = screen.getByRole('img', { name: /settings icon/i });
    expect(img).toHaveClass('h-5 w-5');
  });
});
