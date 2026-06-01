import { Link, useOutletContext } from '@remix-run/react';
import { Heading, RecipeCard } from '~/components';
import { recipes } from './dummy';
import { User } from '~/interfaces';

export function Recipes() {
  const [user] = useOutletContext<[User | null]>();

  return (
    <div
      id="recipes"
      data-testid="recipes"
      className="px-4 py-14 xs:px-8 sm:px-16 md:px-32"
    >
      <div className="flex items-center justify-between px-4 xs:px-0">
        <Heading
          content={'Trending Recipes'}
          type={'section'}
        />
        <Link
          to={'/search'}
          className="capitalize text-primary-900 transition-colors hover:text-primary-700"
        >
          View All Recipes
        </Link>
      </div>
      <p className="font-lg px-4 text-paragraph xs:px-0">
        Satisfy your cravings in a flash! Explore our Quick & Easy Meals for
        effortless recipes without compromising on mouthwatering taste.
      </p>

      {/* Recipe Cards */}
      <div className="flex flex-wrap justify-center gap-3 py-8 xs:gap-6 sm:gap-8">
        {recipes.map((recipe, index) => {
          return (
            <RecipeCard
              key={`${recipe.title}-${index}`}
              image={recipe.image}
              title={recipe.title}
              cookingTime={recipe.readyInMinutes}
              servings={recipe.servings}
              score={recipe.spoonacularScore}
              healthy={recipe.healthScore > 20}
              dairyFree={recipe.dairyFree}
              pricePerServing={recipe.pricePerServing}
              id={recipe.id}
              user={user}
              favorite={user?.favorite_recipes.includes(recipe.id) || false}
            />
          );
        })}
      </div>
    </div>
  );
}
