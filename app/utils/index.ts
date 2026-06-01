/* eslint-disable @typescript-eslint/no-explicit-any */

import { IngredientsType } from '~/services/Recipes/schema';

// Get price color according to the price value
export const getColorFromPrice = (price: number) => {
  if (price < 200) return 'text-green-600';
  else if (price < 300) return 'text-orange-500';
  else return 'text-red-500';
};

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const unhalalIngredients = new Set([
  'pork',
  'bacon',
  'ham',
  'sausage',
  'pork fat',
  'lard',
  'pork gelatin',
  'pork rennet',
  'alcohol',
  'wine',
  'beer',
  'vodka',
  'rum',
  'whiskey',
  'liquor',
  'vinegar',
  'gelatin',
  'rennet',
  'carmine',
  'cochineal',
  'animal enzymes',
  'lard',
  'non-halal meat',
  'cheese with non-halal rennet',
  'marshmallows',
  'gummy candies',
  'jellies',
  'whey',
  'surimi',
  'processed meats',
  'hot dogs',
  'salami',
  'pepperoni',
  'casein',
  'monosodium glutamate (MSG)',
  'sodium stearate',
  'stearic acid',
  'glyceryl monostearate',
  'E120 (carmine)',
  'E441 (gelatin)',
  'E471 (mono- and diglycerides of fatty acids)',
  'E472 (esters of mono- and diglycerides)',
  'E160b (annatto color)',
  'chicken with non-halal slaughtering methods',
  'duck with non-halal slaughtering methods',
  'beef with non-halal slaughtering methods',
  'stock cubes with non-halal meat',
  'wine vinegar',
  'wine',
  'beer vinegar',
  'rum vinegar',
  'cider vinegar',
  'red wine vinegar',
  'orange blossom water',
  'flavored syrups with alcohol',
  'exotic meat',
]);

// Function to check if recipe is halal, unhalal, or ambiguous
export function isRecipeHalal(ingredients: IngredientsType[]) {
  let status = true;

  for (const ingredient of ingredients) {
    if (unhalalIngredients.has(ingredient.name)) {
      status = false;
      break;
    }
  }

  return status;
}
