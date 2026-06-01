import { RecipeCard } from '~/services/Recipes/schema';

export interface SearchRecipesProps {
  recipes: RecipeCard[];
  loading: boolean;
  error: any;
  reachedEnd: boolean;
  loadMoreRecipes: () => void;
  isError: boolean;
}
