import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { ZodSchema, ZodError } from 'zod';
import { handleApiError } from '~/utils/errorHandler';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  body?: BodyInit | null;
}

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

export async function fetchWithSchema<T>(
  url: string,
  schema: ZodSchema<T>,
  options: FetchOptions = { method: 'GET' },
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      return handleApiError(response.status, errorData);
    }

    const data = await response.json();

    // Attempt to parse the data with Zod schema validation
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Zod Parsing Error:', error.errors);
      handleApiError(
        422,
        'Schema validation error: ' + JSON.stringify(error.errors),
      );
    } else if (error instanceof Error) {
      handleApiError(500, error.message);
    } else {
      handleApiError(500, 'An unknown error occurred.');
    }
  }

  throw new Error('An unexpected error occurred and no data was returned.');
}

export function useFetch<T>(
  endpoint: string,
  schema: ZodSchema<T>,
  options: FetchOptions = { method: 'GET' },
  queryOptions: UseQueryOptions<T> = {
    queryKey: [],
  },
): UseQueryResult<T> {
  return useQuery({
    queryFn: () =>
      fetchWithSchema(
        `${API_URL}/${endpoint}&apiKey=${API_KEY}`,
        schema,
        options,
      ),
    ...queryOptions,
  });
}
