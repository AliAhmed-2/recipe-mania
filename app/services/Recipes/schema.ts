import { z } from 'zod';

export const RecipeCardSchema = z.object({
  vegetarian: z.boolean(),
  vegan: z.boolean(),
  glutenFree: z.boolean(),
  dairyFree: z.boolean(),
  veryHealthy: z.boolean(),
  cheap: z.boolean(),
  veryPopular: z.boolean(),
  sustainable: z.boolean(),
  lowFodmap: z.boolean(),
  weightWatcherSmartPoints: z.number(),
  gaps: z.string(),
  preparationMinutes: z.number().nullable(),
  cookingMinutes: z.number().nullable(),
  aggregateLikes: z.number(),
  healthScore: z.number(),
  sourceName: z.string(),
  pricePerServing: z.number(),
  id: z.number(),
  title: z.string(),
  readyInMinutes: z.number(),
  servings: z.number(),
  sourceUrl: z.string().url(),
  image: z.string().url().optional(),
  imageType: z.string().optional(),
  summary: z.string(),
  cuisines: z.array(z.string()),
  dishTypes: z.array(z.string()),
  diets: z.array(z.string()),
  occasions: z.array(z.string()),
  instructions: z.string().optional(),
  originalId: z.string().optional().nullable(),
  spoonacularScore: z.number(),
  spoonacularSourceUrl: z.string().url(),
});

export const RecipesResponseSchema = z.object({
  results: z.array(RecipeCardSchema),
  totalResults: z.number(),
  offset: z.number().optional(),
  number: z.number().optional(),
});

const NutrientSchema = z.object({
  name: z.string(),
  amount: z.number(),
  unit: z.string(),
  percentOfDailyNeeds: z.number().optional(),
});

const IngredientSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.number(),
  unit: z.string(),
  nutrients: z.array(NutrientSchema),
});

export const RecipeSchema = z.object({
  vegetarian: z.boolean(),
  vegan: z.boolean(),
  glutenFree: z.boolean(),
  dairyFree: z.boolean(),
  veryHealthy: z.boolean(),
  cheap: z.boolean(),
  veryPopular: z.boolean(),
  sustainable: z.boolean(),
  lowFodmap: z.boolean(),
  weightWatcherSmartPoints: z.number(),
  gaps: z.string(),
  preparationMinutes: z.number().nullable(),
  cookingMinutes: z.number().nullable(),
  aggregateLikes: z.number(),
  healthScore: z.number(),
  creditsText: z.string(),
  sourceName: z.string(),
  pricePerServing: z.number(),
  id: z.number(),
  title: z.string(),
  readyInMinutes: z.number(),
  servings: z.number(),
  sourceUrl: z.string(),
 image: z.string().url().optional(),
  imageType: z.string(),
  nutrition: z.object({
    nutrients: z.array(NutrientSchema),
    properties: z.array(NutrientSchema).optional(),
    flavonoids: z.array(NutrientSchema).optional(),
    ingredients: z.array(IngredientSchema),
  caloricBreakdown: z.object({
  percentProtein: z.number(),
  percentFat: z.number(),
  percentCarbs: z.number(),
}).optional(),

weightPerServing: z.object({
  amount: z.number(),
  unit: z.string(),
}).optional(),
  }),
taste: z.object({
  sweetness: z.number(),
  saltiness: z.number(),
  sourness: z.number(),
  bitterness: z.number(),
  savoriness: z.number(),
  fattiness: z.number(),
  spiciness: z.number(),
}).optional(),

  summary: z.string(),
  cuisines: z.array(z.string()),
  dishTypes: z.array(z.string()),
  diets: z.array(z.string()),
  occasions: z.array(z.string()),
  instructions: z.string().nullable(),
originalId: z.string().optional().nullable(),
  spoonacularScore: z.number(),
  spoonacularSourceUrl: z.string().optional(),
});

export const suggestionsSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    imageType: z.string(),
  }),
);

// Search suggestions Type
export type searchSuggestionsType = z.infer<typeof suggestionsSchema>;

// Recipe Card Type
export type RecipeCard = z.infer<typeof RecipeCardSchema>;

// Searched Recipes Response
export type SearchedRecipes = z.infer<typeof RecipesResponseSchema>;

// Recipe page Type
export type RecipeType = z.infer<typeof RecipeSchema>;
export type IngredientsType = z.infer<typeof IngredientSchema>;
