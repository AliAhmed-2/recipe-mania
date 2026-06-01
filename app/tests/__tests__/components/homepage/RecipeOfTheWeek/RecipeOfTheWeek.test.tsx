import { screen } from '@testing-library/react';
import { RecipeOfTheWeek } from '~/components';
import { renderWithProviders } from '~/tests/test-utils/renderWithProvider';
import '@testing-library/jest-dom';

describe('RecipeOfTheWeek Component', () => {
  test('renders the RecipeOfTheWeek component with correct heading', () => {
    renderWithProviders(<RecipeOfTheWeek />);

    const heading = screen.getByText('Recipe of the Week');
    expect(heading).toBeInTheDocument();
  });

  test('displays recipe description', () => {
    renderWithProviders(<RecipeOfTheWeek />);

    const description = screen.getByText(/Satisfy your cravings in a flash/i);
    expect(description).toBeInTheDocument();
  });

  test('renders recipe image with correct alt text', () => {
    renderWithProviders(<RecipeOfTheWeek />);

    const image = screen.getByAltText('recipe-of-the-week');
    expect(image).toBeInTheDocument();
  });

  test('displays correct servings and cooking time', () => {
    renderWithProviders(<RecipeOfTheWeek />);

    const servings = screen.getByText('12 Servings');
    const cookingTime = screen.getByText('90 Minutes');
    expect(servings).toBeInTheDocument();
    expect(cookingTime).toBeInTheDocument();
  });

  test('displays correct food score and price per serving', () => {
    renderWithProviders(<RecipeOfTheWeek />);

    const foodScore = screen.getByText('Food score:');
    const pricePerServing = screen.getByText('$129');
    expect(foodScore).toBeInTheDocument();
    expect(pricePerServing).toBeInTheDocument();
  });

  test('displays nutrition information correctly', () => {
    renderWithProviders(<RecipeOfTheWeek />);

    const nutritionInfo = screen.getByText(/670 calories/i);
    expect(nutritionInfo).toBeInTheDocument();
  });
});
