import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chips from '~/components/search/Chips';

describe('Chips Component', () => {
  const mockOnChange = vi.fn();

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  test('renders the component with title and options', () => {
    render(
      <Chips
        title="Test Title"
        options={options}
        onChange={mockOnChange}
      />,
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  test('expands and collapses the options when the title is clicked', () => {
    render(
      <Chips
        title="Test Title"
        options={options}
        onChange={mockOnChange}
      />,
    );

    const contentDiv = screen.getByTestId('chips-container');

    expect(contentDiv).toHaveClass('max-h-0');
    expect(screen.getByText('+')).toBeInTheDocument();

    // expanding the chips
    fireEvent.click(screen.getByText('Test Title'));
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(contentDiv).toHaveClass('max-h-96');

    // collapsing the chips
    fireEvent.click(screen.getByText('Test Title'));
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(contentDiv).toHaveClass('max-h-0');
  });

  test('toggles the selection state of chips when clicked', () => {
    render(
      <Chips
        title="Test Title"
        options={options}
        onChange={mockOnChange}
      />,
    );

    // Click on first option
    fireEvent.click(screen.getByText('Option 1'));
    // onchange should be called
    expect(mockOnChange).toHaveBeenCalledWith(['option1']);

    fireEvent.click(screen.getByText('Option 1'));
    expect(mockOnChange).toHaveBeenCalledWith([]);

    // Select another option
    fireEvent.click(screen.getByText('Option 2'));
    expect(mockOnChange).toHaveBeenCalledWith(['option2']);
  });

  test('correctly applies styles to selected and unselected chips', () => {
    render(
      <Chips
        title="Test Title"
        options={options}
        onChange={mockOnChange}
      />,
    );

    const option1 = screen.getByText('Option 1');
    const option2 = screen.getByText('Option 2');

    // both options will have unselected style initially
    expect(option1).toHaveClass('border-gray-400');
    expect(option2).toHaveClass('border-gray-400');

    // Click to select Option 1
    fireEvent.click(screen.getByText('Option 1'));
    expect(option1).toHaveClass(
      'border-primary-800 bg-primary-100 text-primary-800',
    );

    expect(option2).toHaveClass('border-gray-400 text-gray-400');

    // Selecting Option 2
    fireEvent.click(screen.getByText('Option 2'));
    expect(option1).toHaveClass(
      'border-primary-800 bg-primary-100 text-primary-800',
    );
    expect(option2).toHaveClass(
      'border-primary-800 bg-primary-100 text-primary-800',
    );
  });

  test('calls onChange with the correct selected options when multiple chips are selected and deselected', () => {
    render(
      <Chips
        title="Test Title"
        options={options}
        onChange={mockOnChange}
      />,
    );

    // Select multiple options
    fireEvent.click(screen.getByText('Option 1'));
    fireEvent.click(screen.getByText('Option 2'));

    expect(mockOnChange).toHaveBeenCalledWith(['option1', 'option2']);

    // Unselect an option
    fireEvent.click(screen.getByText('Option 1'));

    expect(mockOnChange).toHaveBeenCalledWith(['option2']);
  });
});
