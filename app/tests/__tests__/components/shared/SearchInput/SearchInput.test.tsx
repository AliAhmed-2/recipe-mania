import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchInput } from '~/components';

describe('SearchInput Component', () => {
  test('renders input component correctly', () => {
    render(<SearchInput handleInputChange={() => {}} />);
    expect(
      screen.getByPlaceholderText('Search for recipes...'),
    ).toBeInTheDocument();
  });

  test('displays initial value thats passed with the value prop', () => {
    const value = 'Pasta';
    render(
      <SearchInput
        handleInputChange={() => {}}
        value={value}
      />,
    );
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });

  test('updates keyword state on input change', () => {
    render(<SearchInput handleInputChange={() => {}} />);
    const input = screen.getByPlaceholderText('Search for recipes...');
    fireEvent.change(input, { target: { value: 'Pizza' } });
    expect(input).toHaveValue('Pizza');
  });

  test('calls handleInputChange with the correct value on input change', () => {
    const handleInputChange = vi.fn();
    render(<SearchInput handleInputChange={handleInputChange} />);
    const input = screen.getByPlaceholderText('Search for recipes...');
    fireEvent.change(input, { target: { value: 'Burger' } });
    expect(handleInputChange).toHaveBeenCalledWith('Burger');
  });

  test('displays clear button when there is input', () => {
    render(
      <SearchInput
        handleInputChange={() => {}}
        value="Some text"
      />,
    );
    const clearButton = screen.getByTestId('clear-button');
    expect(clearButton).toBeVisible();
  });

  test('clicking clear button clears the input and calls handleInputChange with an empty string', () => {
    const handleInputChange = vi.fn();
    render(
      <SearchInput
        handleInputChange={handleInputChange}
        value="Some text"
      />,
    );
    const clearButton = screen.getByTestId('clear-button');

    fireEvent.click(clearButton);

    expect(screen.getByPlaceholderText('Search for recipes...')).toHaveValue(
      '',
    );
    expect(handleInputChange).toHaveBeenCalledWith('');
  });

  test('displays search button when showSearchButton is true and input is not empty', () => {
    render(
      <SearchInput
        handleInputChange={() => {}}
        value="Apple"
        showSearchButton={true}
      />,
    );
    const searchButton = screen.getByRole('button');
    expect(searchButton).toBeVisible();
  });

  test('does not display search button when showSearchButton is false', () => {
    render(
      <SearchInput
        handleInputChange={() => {}}
        value="Apple"
        showSearchButton={false}
      />,
    );
    const searchButton = screen.queryByRole('button');
    expect(searchButton).toBeNull();
  });

  test('displays the correct class for search button when input is empty', () => {
    render(
      <SearchInput
        handleInputChange={() => {}}
        value=""
        showSearchButton={true}
      />,
    );
    const searchButton = screen.getByRole('button');
    expect(searchButton).toHaveClass('opacity-0');
  });
});
