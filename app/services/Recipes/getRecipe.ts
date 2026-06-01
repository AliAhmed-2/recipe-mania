import { useFetch } from '..';
import { RecipeSchema, RecipeType } from './schema';

const useGetRecipe = (id: string) => {
  const query = `recipes/${id}/information?addTasteData=true&includeNutrition=true`;

  return useFetch<RecipeType>(
    query,
    RecipeSchema,
    { method: 'GET' },
    {
      queryKey: ['getRecipe', id],
      staleTime: 1000 * 60 * 60,
      throwOnError: true,
    },
  );
};

export default useGetRecipe;
