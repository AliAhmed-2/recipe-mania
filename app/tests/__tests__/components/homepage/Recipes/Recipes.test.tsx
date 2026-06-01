import { fireEvent, screen } from '@testing-library/react';
import { Recipes } from '~/components';
import { recipes } from '~/components/homepage/Recipes/dummy';
import { renderWithProviders } from '~/tests/test-utils/renderWithProvider';
import '@testing-library/jest-dom';

describe('Recipes Component', () => {
  test('displays description text', () => {
    renderWithProviders(<Recipes />);

    const description = screen.getByText(/Satisfy your cravings in a flash/i);
    expect(description).toBeInTheDocument();
  });

  test('renders correct number of recipe cards', () => {
    renderWithProviders(<Recipes />);

    const recipeCards = screen.getAllByTestId('recipe-card');
    expect(recipeCards.length).toBe(8);
  });

  test('renders each recipe card with correct details', () => {
    renderWithProviders(<Recipes />);

    const firstRecipe = recipes[0];
    const recipeTitle = screen.getByText(firstRecipe.title);
    expect(recipeTitle).to.exist;

    const servings = screen.getAllByText(`${firstRecipe.servings} Servings`);
    expect(servings).to.exist;

    const cookingTime = screen.getAllByText(
      `${firstRecipe.readyInMinutes} Minutes`,
    );
    expect(cookingTime).to.exist;
  });

  test('renders the Recipes component and navigates to search button on link click', async () => {
    renderWithProviders(<Recipes />, {
      route: '/',
      routes: [
        { path: '/', element: <Recipes /> },
        { path: '/search', element: <div>Search Page</div> },
      ],
    });

    const heading = screen.getByText('Trending Recipes');
    expect(heading).toBeInTheDocument();

    const viewAllLink = screen.getByRole('link', { name: /view all recipes/i });
    expect(viewAllLink).toBeInTheDocument();

    fireEvent.click(viewAllLink);

    expect(screen.getByText(/search page/i)).toBeInTheDocument();
  });
});
