import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';
import {
  createMemoryRouter,
  RouterProvider,
  RouteObject,
} from 'react-router-dom';
import React from 'react';

interface RenderWithProvidersOptions {
  route?: string;
  routes?: RouteObject[];
}

const renderWithProviders = (
  ui: React.ReactElement,
  {
    route = '/',
    routes = [{ path: '*', element: ui }],
  }: RenderWithProvidersOptions = {},
) => {
  // Initialize QueryClient with default options to reset cache and error handling
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries to keep tests predictable
        staleTime: Infinity, // Keep data fresh in test to avoid background re-fetches
      },
    },
  });

  // Set up a memory router with custom routes for testing
  const router = createMemoryRouter(routes, {
    initialEntries: [route],
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
};

export { renderWithProviders };
