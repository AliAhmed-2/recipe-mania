import { screen } from '@testing-library/react';
import HomeLayout from '~/routes/_home';
import '@testing-library/jest-dom';
import { renderWithProviders } from '~/tests/test-utils/renderWithProvider';

// This is just a layout file, so testcases will only test rendering of the main components
describe('Recipes Component', () => {
  test('sets correct meta data', () => {
    renderWithProviders(<HomeLayout />);
    expect(screen.getByTestId('home-layout')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
