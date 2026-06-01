import { render, screen } from '@testing-library/react';
import { Categories } from '~/components';
import { categories } from '~/components/homepage/Categories/constants';
import '@testing-library/jest-dom';

describe('Categories Component', () => {
  test('renders the component', () => {
    render(<Categories />);

    const titleElement = screen.getByText(/Categories/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the correct number of categories', () => {
    render(<Categories />);

    const categoryElements = screen.getAllByTestId(/category-/); // Matches data-testid="category-*"
    expect(categoryElements.length).toBe(categories.length);
  });

  test('each category has a background image', () => {
    render(<Categories />);

    categories.forEach((category) => {
      const formattedCategory = category.toLowerCase().replace(/\s/, '');
      const categoryImage = screen.getByTestId(`category-${formattedCategory}`);
      expect(categoryImage.style.backgroundImage).to.contain(
        `/images/categories/${formattedCategory}.jpg`,
      );
    });
  });

  test('each category displays the correct text', () => {
    render(<Categories />);

    categories.forEach((category) => {
      const categoryText = screen.getByText(category);
      expect(categoryText).toBeInTheDocument();
    });
  });
});
