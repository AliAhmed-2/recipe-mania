import { screen } from '@testing-library/react';
import { Hero } from '~/components';
import { renderWithProviders } from '~/tests/test-utils/renderWithProvider';
import '@testing-library/jest-dom';

import { expect } from 'chai';

describe('Hero Component', () => {
  test('renders the Hero component with correct headings', () => {
    renderWithProviders(<Hero />);

    const heading1 = screen.getByText('Fuel your body & soul -');
    expect(heading1).toBeInTheDocument();

    const heading2 = screen.getByText('find recipes that taste amazing!');
    expect(heading2).toBeInTheDocument();
  });

  test('renders the search input form with SearchInput and button', () => {
    renderWithProviders(<Hero />);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeInTheDocument();
  });

  test('form uses the post method', () => {
    renderWithProviders(<Hero />);
    const form = screen.getByTestId('hero-form');

    expect(form.getAttribute('method')).to.equal('post');
  });

  test('hero component has correct background', () => {
    renderWithProviders(<Hero />);
    const heroElement = screen.getByTestId('hero');
    expect(heroElement.className).to.include('bg-hero-background');
  });
});
