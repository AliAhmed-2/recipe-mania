import { render, screen } from '@testing-library/react';
import { Heading } from '~/components';
import '@testing-library/jest-dom';

describe('Heading Component', () => {
  test('renders the correct HTML tag based on the type prop', () => {
    const types: {
      type: 'page' | 'section' | 'recipe' | 'main';
      expectedTag: string;
    }[] = [
      { type: 'page', expectedTag: 'h1' },
      { type: 'section', expectedTag: 'h2' },
      { type: 'recipe', expectedTag: 'h3' },
      { type: 'main', expectedTag: 'h1' },
    ];
    types.forEach(({ type, expectedTag }, index: number) => {
      render(
        <Heading
          type={type}
          content="Test Content"
        />,
      );
      const heading = screen.getAllByText('Test Content')[index];
      expect(heading.tagName.toLowerCase()).toBe(expectedTag);
    });
  });

  test('applies the correct style classes based on the type prop', () => {
    const types: {
      type: 'page' | 'section' | 'recipe' | 'main';
      expectedClass: string;
    }[] = [
      { type: 'page', expectedClass: 'text-center' },
      {
        type: 'section',
        expectedClass:
          'font-secondary text-black text-2xl font-semibold text-start text-primary-900',
      },
      {
        type: 'recipe',
        expectedClass:
          'font-primary text-lg font-medium text-start whitespace-nowrap text-ellipsis overflow-hidden',
      },
    ];

    types.forEach(({ type, expectedClass }, index: number) => {
      render(
        <Heading
          type={type}
          content="Styled Content"
        />,
      );
      const heading = screen.getAllByText('Styled Content')[index];
      expect(heading).toHaveClass(expectedClass);
    });
  });

  test('renders with the provided id prop', () => {
    render(
      <Heading
        type="page"
        id="test-heading"
        content="Test Content"
      />,
    );
    const heading = screen.getByText('Test Content');
    expect(heading).toHaveAttribute('id', 'test-heading');
  });

  test('displays the content correctly', () => {
    render(
      <Heading
        type="page"
        content="Displayed Content"
      />,
    );
    const heading = screen.getByText('Displayed Content');
    expect(heading).toBeInTheDocument();
  });

  test('appends additional classes from className prop', () => {
    render(
      <Heading
        type="section"
        className="extra-class"
        content="Additional Class"
      />,
    );
    const heading = screen.getByText('Additional Class');
    expect(heading).toHaveClass('extra-class');
  });

  test('handles unsupported type gracefully', () => {
    render(
      <Heading
        type={'unsupported' as any}
        content="Content"
      />,
    );
    const heading = screen.getByText('Content');

    expect(heading).toBeInTheDocument();
  });
});
