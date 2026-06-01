import { User } from '~/interfaces';

export interface RecipeCardProps {
  image: string;
  title: string;
  cookingTime: number;
  servings: number;
  score: number;
  healthy: boolean;
  dairyFree: boolean;
  id: number;
  pricePerServing: number;
  user: User | null;
  favorite: boolean;
  handleFavoriteRemove?: (id: number) => void | null;
}
