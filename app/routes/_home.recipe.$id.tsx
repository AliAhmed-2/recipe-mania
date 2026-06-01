/* eslint-disable prefer-const */
import { MetaFunction, useParams } from '@remix-run/react';
import ClipLoader from 'react-spinners/ClipLoader';
import {
  Description,
  Ingredients,
  Instructions,
  Introduction,
  NutritionTable,
  TasteTable,
} from '~/components';
import useGetRecipe from '~/services/Recipes/getRecipe';
import { isRecipeHalal } from '~/utils';

export const meta: MetaFunction = () => {
  return [
    { title: 'Recipe Mania' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

const Recipe = () => {
  const { id } = useParams();

  if (!id) throw new Error('Please provide a recipe id');

  const { data, isLoading } = useGetRecipe(id);

  if (isLoading) {
    return (
      <main className="flex-col-center h-[80vh] w-[100vw] gap-6">
        {/* {isLoading ? ( */}
        <img
          src="/images/loading.svg"
          alt=""
          className="h-32 w-32"
        />
        <p className="text-lg italic text-primary-800">
          Getting your recipe 🍪...
        </p>
        {/* ) : null} */}
      </main>
    );
  }
  if (!data) {
    return <div className="flex-center h-[50vh] w-full">Recipe not found.</div>;
  }

  let { nutrition, instructions, taste, ...details } = data;

  const isHalal = isRecipeHalal(nutrition.ingredients);

  return (
    <main className="flex flex-col py-8 2xl:px-52">
      {isLoading ? (
        <ClipLoader
          color={'#C57D5D'}
          loading={true}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <p className="text-gray-400">
            Home {'>'} Recipe {'>'}{' '}
            <span className="font-medium text-primary-800 opacity-100">
              {details.title}
            </span>
          </p>
          <Introduction
            title={details.title}
            sourceName={details.sourceName}
            veryHealthy={details.veryHealthy}
            dairyFree={details.dairyFree}
            spoonacularScore={details.spoonacularScore}
            isHalal={isHalal}
          />
          <div className="flex h-full flex-col gap-8 md:flex-row md:gap-4">
            <section
              id="recipe-left"
              className="flex h-full w-full flex-col gap-9 px-4 md:w-4/6"
            >
              <Description
                image={details.image}
                readyInMinutes={details.readyInMinutes}
                servings={details.servings}
                pricePerServing={details.pricePerServing}
                summary={details.summary}
              />
              <Ingredients ingredientsList={nutrition.ingredients} />
              {instructions && (
                <Instructions
                  instructions={instructions
                    .replace(/<li>|<\/?ol>/g, '')
                    .split('</li>')}
                />
              )}
            </section>
            <section
              id="recipe-right"
              className="flex-7 h-screen w-full items-start md:w-2/6"
            >
              <NutritionTable
                values={nutrition.nutrients.slice(0, 8)}
                caloricBreakdown={nutrition.caloricBreakdown}
              />
              <TasteTable taste={taste} />
            </section>
          </div>
        </>
      )}
    </main>
  );
};

export default Recipe;
