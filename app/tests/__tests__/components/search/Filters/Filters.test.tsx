import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Filters } from '~/components';
import {
  mealOptions,
  cuisineOptions,
  dietOptions,
} from '~/components/search/Filters/constants';

describe('Filters Component', () => {
  const setFilters = vi.fn();

  test('renders all filter and chips components with options', () => {
    render(<Filters setFilters={setFilters} />);

    expect(screen.getByText('Meal Type')).toBeInTheDocument();
    expect(screen.getByText('Cuisine Type')).toBeInTheDocument();
    expect(screen.getByText('Diet Preferences')).toBeInTheDocument();

    // expand the chips so that options are visible
    fireEvent.click(screen.getByText('Meal Type'));
    fireEvent.click(screen.getByText('Cuisine Type'));

    mealOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });

    cuisineOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });

    dietOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  test('calls setFilters when a chip option is selected and deselected', () => {
    render(<Filters setFilters={setFilters} />);

    const breakfastChip = screen.getByText('Breakfast');
    fireEvent.click(breakfastChip);

    // setFilters was called to select options
    expect(setFilters).toHaveBeenCalled();

    // Deselect the chip
    fireEvent.click(breakfastChip);

    // setFilters was called to unselect options
    expect(setFilters).toHaveBeenCalled();
  });

  test('calls setFilters when a filter group option is selected', () => {
    render(<Filters setFilters={setFilters} />);

    const italianCuisine = screen.getByText('Italian');
    fireEvent.click(italianCuisine);

    expect(setFilters).toHaveBeenCalled();

    // Deselect the cuisine option
    fireEvent.click(italianCuisine);

    expect(setFilters).toHaveBeenCalled();
  });
});
