import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '~/components';
import '@testing-library/jest-dom';

describe('Button Component', () => {
  test('renders the button component with correct title', () => {
    render(<Button buttonText={'Test Button'} />);

    const button = screen.getByRole('button');
    expect(button.getAttribute('type')).to.equal('button');
    expect(button.textContent).to.equal('Test Button');
  });

  test('renders the correct type of button if submit flag is present', () => {
    render(
      <Button
        buttonText={'Test Button'}
        submit
      />,
    );

    const button = screen.getByRole('button');
    expect(button.getAttribute('type')).to.equal('submit');
  });

  test('calls the passed onClick function when clicked', () => {
    const handleClick = vi.fn();

    render(
      <Button
        buttonText="Test Button"
        onClick={handleClick}
      />,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders correct style according to the type selected', () => {
    render(
      <Button
        buttonText="Test Button"
        type={'primary'}
      />,
    );

    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-primary-500 text-white');
  });
});
