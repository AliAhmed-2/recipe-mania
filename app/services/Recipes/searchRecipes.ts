import { useFetch } from '..';
import { RecipesResponseSchema, SearchedRecipes } from './schema';

const useSearchRecipes = (
  searchQuery: string,
  filters: { cuisine?: string[]; diet?: string[]; type?: string[] } = {},
  offset: number = 0,
) => {
  const { cuisine = [], diet = [], type = [] } = filters;
  const query = `recipes/complexSearch?addRecipeInformation=true&number=9&query=${searchQuery}&offset=${offset}&cuisine=${cuisine.join(',')}&diet=${diet.join(',')}&type=${type.join(',')}`;

  return useFetch<SearchedRecipes>(
    query,
    RecipesResponseSchema,
    { method: 'GET' },
    {
      queryKey: ['searchRecipes', searchQuery, cuisine, diet, type, offset],
      enabled:
        !!searchQuery || !!cuisine.length || !!diet.length || !!type.length,
      staleTime: 1000 * 60 * 5,
    },
  );
};

export default useSearchRecipes;
