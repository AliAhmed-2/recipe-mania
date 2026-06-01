import { RecipeCardSchema, RecipeCard } from './schema';
import { fetchWithSchema, useFetch } from '..';
import { z } from 'zod';

// this route is used in search page after hydration
const useGetRecipes = () => {
  const query = `/recipes/random?number=9`;

  return useFetch<RecipeCard[]>(
    query,
    RecipeCardSchema.array(),
    { method: 'GET' },
    {
      queryKey: ['get-recipes'],
    },
  );
};

const useGetRecipesByIds = (ids: number[]) => {
  const query = `recipes/informationBulk?ids=${ids}`;

  return useFetch<RecipeCard[]>(
    query,
    RecipeCardSchema.array(),
    { method: 'GET' },
    {
      queryKey: [`get-recipes-bulk-${ids}`],
    },
  );
};

export { useGetRecipes, useGetRecipesByIds };

// this route is used in the loader of search route to prefetch the recipes
export const fetchRecipes = async (): Promise<RecipeCard[]> => {
  const endpoint = `/recipes/random?number=9`;

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  const data = await fetchWithSchema(
    `${API_URL}/${endpoint}&apiKey=${API_KEY}`,
    z.object({ recipes: RecipeCardSchema.array() }),
    { method: 'GET' },
  );

  return data.recipes;
};

export const fetchRecipesByIds = async (
  ids: number[],
): Promise<RecipeCard[]> => {
  const endpoint = `recipes/informationBulk?ids=${ids}`;

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  console.log(`${API_URL}/${endpoint}&apiKey=${API_KEY}`);
  const recipes = await fetchWithSchema(
    `${API_URL}/${endpoint}&apiKey=${API_KEY}`,
    RecipeCardSchema.array(),
    { method: 'GET' },
  );

  return recipes;
};
