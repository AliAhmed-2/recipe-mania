import { IngredientsType } from '~/services/Recipes/schema';
import { IngredientCard } from './IngredientCard';
import { Heading } from '~/components';

export const Ingredients = ({
  ingredientsList,
}: {
  ingredientsList: IngredientsType[];
}) => {
  return (
    <div>
      <Heading
        content={'Ingredients'}
        type={'section'}
        className="!mt-0 mb-6"
      />
      <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
        {ingredientsList.map((ingredient: IngredientsType, index: number) => {
          return (
            <IngredientCard
              ingredient={ingredient}
              key={ingredient.name + index}
            />
          );
        })}
      </div>
    </div>
  );
};
