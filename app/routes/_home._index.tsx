import {
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import { Categories, Hero, RecipeOfTheWeek, Recipes } from '~/components';

export const meta: MetaFunction = () => {
  return [
    { title: 'Recipe Mania' },
    {
      name: 'description',
      content:
        'Welcome to Recipe Mania, your one-stop solution where you can browse recipes from around the world, get recipe scores and filter recipes according to your need and diet!',
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  return redirect(`/search?query=${body.get('search-query')}`);
}

export default function Index() {
  return (
    <main className="h-full w-full">
      {/* Hero Section */}
      <Hero />
      {/* Recipes Section */}
      <Recipes />
      {/* Categories Section */}
      <Categories />
      {/* Recipe of the Week Section */}
      <RecipeOfTheWeek />
    </main>
  );
}
