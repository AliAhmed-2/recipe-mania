import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RecipeCard } from '~/components';
import { renderWithProviders } from '~/tests/test-utils/renderWithProvider';

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const mod =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom',
    );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe('RecipeCard Component', () => {
  const defaultProps = {
    id: 1,
    image: 'test-image.jpg',
    title: 'Delicious Recipe',
    cookingTime: 30,
    servings: 4,
    score: 8.5,
    healthy: true,
    dairyFree: true,
    pricePerServing: 10.99,
  };

  test('renders RecipeCard with all properties', async () => {
    renderWithProviders(<RecipeCard {...defaultProps} />);

    const image = screen.getByAltText(`recipe-${defaultProps.title}`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', defaultProps.image);

    const title = screen.getByText('Delicious Recipe');
    expect(title).toBeInTheDocument();

    expect(screen.getByText(/4 Servings/i)).toBeInTheDocument();

    expect(screen.getByText(/30 Minutes/i)).toBeInTheDocument();

    expect(screen.getByText(/Food score:/i)).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();

    expect(screen.getByText(/\$10/i)).toBeInTheDocument();

    expect(screen.getByText('Healthy')).toBeInTheDocument();
    expect(screen.getByText('Dairy-free')).toBeInTheDocument();
  });

  test('navigates to recipe detail page on click', async () => {
    renderWithProviders(<RecipeCard {...defaultProps} />);

    const card = screen.getByTestId('recipe-card');
    fireEvent.click(card);

    waitFor(async () => {
      expect(mockedUseNavigate).toHaveBeenCalledWith('/recipe/1');
    });
  });

  test('renders Healthy and Dairy-free tags when healthy and dairyFree props are true', () => {
    renderWithProviders(
      <RecipeCard
        {...defaultProps}
        healthy={true}
        dairyFree={true}
      />,
    );

    expect(screen.getByText('Healthy')).toBeInTheDocument();
    expect(screen.getByText('Dairy-free')).toBeInTheDocument();
  });

  test('does not render Healthy and Dairy-free tags when healthy and dairyFree props are false', () => {
    renderWithProviders(
      <RecipeCard
        {...defaultProps}
        healthy={false}
        dairyFree={false}
      />,
    );

    expect(screen.queryByText('Healthy')).not.toBeInTheDocument();
    expect(screen.queryByText('Dairy-free')).not.toBeInTheDocument();
  });

  test('displays score and price per serving correctly', () => {
    renderWithProviders(
      <RecipeCard
        {...defaultProps}
        score={8.4}
        pricePerServing={10.5}
      />,
    );

    expect(screen.getByTestId('food-score')).toHaveTextContent('8');
    expect(screen.getByText(/\$10/i)).toBeInTheDocument();
  });
});
