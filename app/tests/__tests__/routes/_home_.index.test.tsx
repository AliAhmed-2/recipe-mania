import { redirect } from '@remix-run/react';
import { screen } from '@testing-library/react';
import Index, { action, meta } from '~/routes/_home._index';
import { renderWithProviders } from '~/tests/test-utils/renderWithProvider';
import '@testing-library/jest-dom';

describe('Recipes Component', () => {
  test('sets correct meta data', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = meta({} as any);
    expect(result).toEqual([
      { title: 'Recipe Mania' },
      {
        name: 'description',
        content:
          'Welcome to Recipe Mania, your one-stop solution where you can browse recipes from around the world, get recipe scores and filter recipes according to your need and diet!',
      },
    ]);
  });

  test('renders all main sections', () => {
    renderWithProviders(<Index />);

    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('recipes')).toBeInTheDocument();
    expect(screen.getByTestId('categories')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-of-the-week')).toBeInTheDocument();
  });

  test('form action redirects with search query', async () => {
    const request = {
      formData: async () => {
        const formData = new FormData();
        formData.append('search-query', 'pizza');
        return formData;
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await action({ request } as any);

    expect(response).toEqual(redirect('/search?query=pizza'));
  });
});
