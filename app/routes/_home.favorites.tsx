import { LoaderFunctionArgs } from '@remix-run/node';
import { json, useLoaderData, useOutletContext } from '@remix-run/react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IoMdHeart } from 'react-icons/io';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import { SearchBar, Heading, RecipeCard } from '~/components';
import { Recipe, User } from '~/interfaces';
import {
  fetchRecipesByIds,
  useGetRecipesByIds,
} from '~/services/Recipes/getRecipes';
import prisma from '../../prisma/index';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const queryClient = new QueryClient();

  // get the user from cookie first
  const cookies = parse(request.headers.get('Cookie') || '');
  const token = cookies['auth-token'];

  if (!token) {
    throw new Error('Please login first to add and view favortie recipes.');
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || '') as {
      email: string;
    };

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    // Use prefetchQuery to fetch data for server-side rendering
    await queryClient.prefetchQuery({
      queryKey: [`get-recipes-bulk-${user?.favorite_recipes}`],
      queryFn: () => fetchRecipesByIds(user?.favorite_recipes || []),
    });

    // Return the dehydrated state so it can be used in the client
    return json({ dehydratedState: dehydrate(queryClient) });
  } catch (error) {
    console.error('Error verifying token:', error);

    if (error instanceof jwt.JsonWebTokenError) {
      // Invalid token
      return { dehydratedState: null };
    }

    if (error instanceof jwt.TokenExpiredError) {
      // Token is expired
      return { dehydratedState: null };
    }

    return { dehydratedState: null };
  }
};

export default function Index() {
  // Use the dehydrated state from the loader
  const { dehydratedState } = useLoaderData<typeof loader>();

  // HydrationBoundary provides the dehydrated state to React Query on the client
  return (
    <HydrationBoundary state={dehydratedState}>
      <Favorites />
    </HydrationBoundary>
  );
}

const Favorites = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [user] = useOutletContext<[User | null]>();

  const { data: recipesData, error } = useGetRecipesByIds(
    user?.favorite_recipes || [],
  );

  useEffect(() => {
    if (recipesData) setRecipes(recipesData);
  }, []);

  useEffect(() => {
    if (error) throw new Error(error.message);
  }, [error]);

  const handleSearchQuery = () => {
    setSearchQuery('');
  };

  const handleFavoriteRemove = (id: number) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe: { id: number }) => recipe.id !== id),
    );
  };

  return (
    <div>
      <SearchBar
        handleSearch={handleSearchQuery}
        value={searchQuery}
        showSuggestions={false}
        placeholder="Search in favorites"
      />
      <div className="px-4 py-8 xs:px-8 sm:px-16 md:px-32">
        <div className="flex items-center gap-2">
          <div className="flex-center glass rounded-full p-1">
            <IoMdHeart
              size={40}
              className={`relative top-[0.05rem]`}
              color=" rgb(255, 65, 108)"
            />
          </div>
          <Heading
            content={'Favorites'}
            type={'section'}
          />
          <span className="relative top-1 ml-1 font-secondary text-2xl opacity-75">
            ({recipes?.length} Recipes)
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-3 py-8 xs:gap-6 sm:gap-8">
          {recipes?.map((recipe, index) => {
            return (
              <RecipeCard
                key={`${recipe.title}-${index}`}
                image={recipe.image || ''}
                title={recipe.title}
                cookingTime={recipe.readyInMinutes}
                servings={recipe.servings}
                score={recipe.spoonacularScore}
                healthy={recipe.healthScore > 20}
                dairyFree={recipe.dairyFree}
                pricePerServing={recipe.pricePerServing}
                id={recipe.id}
                favorite={user?.favorite_recipes.includes(recipe.id) || false}
                user={user}
                handleFavoriteRemove={handleFavoriteRemove}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
