import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData, useLocation } from '@remix-run/react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import {
  Filters,
  SearchBar,
  SearchRecipes as SearchRecipesSection,
  SortByDropdown,
} from '~/components';
import { OptionInterface, Recipe, SelectedFiltersData } from '~/interfaces';

import { fetchRecipes, useGetRecipes } from '~/services/Recipes/getRecipes';
import { RecipeCard } from '~/services/Recipes/schema';
import useSearchRecipes from '~/services/Recipes/searchRecipes';
import { debounce } from '~/utils';

export const meta: MetaFunction = () => {
  return [
    { title: 'Search - Recipe Mania' },
    { name: 'description', content: 'Welcome to Recipe Mania!' },
  ];
};

export async function loader() {
  const queryClient = new QueryClient();

  // Use prefetchQuery to fetch data for server-side rendering
  await queryClient.prefetchQuery({
    queryKey: ['get-recipes'],
    queryFn: fetchRecipes,
  });

  // Return the dehydrated state so it can be used in the client
  return json({ dehydratedState: dehydrate(queryClient) });
}

export default function Index() {
  // Use the dehydrated state from the loader
  const { dehydratedState } = useLoaderData<typeof loader>();

  // HydrationBoundary provides the dehydrated state to React Query on the client
  return (
    <HydrationBoundary state={dehydratedState}>
      <Recipes />
    </HydrationBoundary>
  );
}

function Recipes() {
  const { data: recipesData } = useGetRecipes();

  const [recipes, setRecipes] = useState<RecipeCard[]>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totalResults, setTotalResults] = useState<number>();
  const [offset, setOffset] = useState<number>(0);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);

  const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersData>({
    cuisine: [],
    diet: [],
    type: [],
  });

  const location = useLocation();
  const {
    data: searchedRecipes,
    isLoading,
    isError,
    error,
  } = useSearchRecipes(searchQuery, selectedFilters, offset);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    let cuisine = params.get('cuisine') || [];
    const diet = params.get('diet') || [];
    const type = params.get('type') || [];

    if (query) {
      setSearchQuery(query);
    }
    if (cuisine || diet || type) {
      if (cuisine === 'mideast') cuisine = 'middle eastern';
      setSelectedFilters({
        cuisine: cuisine?.length ? [cuisine as string] : [],
        type: type?.length ? [type as string] : [],
        diet: diet?.length ? [diet as string] : [],
      });
    }
  }, [location.search]);

  // Handling user input search debouncing
  const handleSearchQuery = useCallback(
    debounce((keyword: string) => {
      if (keyword.trim()) {
        resetResults();
        setSearchQuery(keyword);
      }
    }, 500),
    [],
  );

  const handleFiltersChange = useCallback(
    debounce((filters: SelectedFiltersData) => {
      resetResults();
      setSelectedFilters(filters);
    }, 500),
    [],
  );

  const resetResults = () => {
    setOffset(0);
    setReachedEnd(false);
  };

  const handleLoadMore = () => {
    if (!totalResults) return;
    if (totalResults > offset + 9) {
      setOffset((prevOffset: number = 0) => prevOffset + 9);
    } else {
      setReachedEnd(true);
    }
  };

  // searching api on every search query change
  useEffect(() => {
    if (!searchedRecipes) return;
    if (offset > 0) {
      setRecipes((prevRecipes) => prevRecipes?.concat(searchedRecipes.results));
    } else {
      setRecipes(searchedRecipes.results);
    }
    setOffset(searchedRecipes.offset || 0);
    setTotalResults(searchedRecipes.totalResults);
  }, [searchedRecipes]);

  // set initial data when the page renders
  useEffect(() => {
    if (typeof recipesData === 'string' || !recipesData) return;
    setRecipes(recipesData);
  }, [recipesData]);

  // handle sorting option change
  const handleSort = (selectedSort: OptionInterface | null) => {
    const value = selectedSort?.value;
    const sortOptions: Record<string, (a: Recipe, b: Recipe) => number> = {
      'price-high': (a, b) => a.pricePerServing - b.pricePerServing,
      'price-low': (a, b) => b.pricePerServing - a.pricePerServing,
      'food-score': (a, b) => b.spoonacularScore - a.spoonacularScore,
      'relevance': (a, b) => b.id - a.id,
    };
    const sortedRecipes = recipes
      ? [...recipes].sort(
          sortOptions[value ?? 'relevance'] || sortOptions['relevance'],
        )
      : [];
    setRecipes(sortedRecipes);
  };

  return (
    <main className="h-full w-full">
      <SearchBar
        handleSearch={handleSearchQuery}
        value={searchQuery}
      />
      <div className="flex justify-between px-4 py-6 sm:px-16 2xl:px-32">
        <p className="text flex-center font-secondary text-lg font-semibold">
          FILTER BY
        </p>
        <SortByDropdown onChange={handleSort} />
      </div>
      <div className="flex flex-col gap-4 px-4 sm:flex-row sm:px-16 2xl:gap-2 2xl:px-32">
        <Filters
          setFilters={handleFiltersChange}
          preSelected={selectedFilters}
        />
        <div className="flex h-full w-full flex-col">
          {totalResults && !isError ? (
            <p className="mb-4 ml-12 italic">
              Showing{' '}
              <span className="font-medium text-primary-700">
                {searchQuery}
              </span>{' '}
              Recipes:{' '}
              <span className="font-medium text-primary-700">
                {recipes?.length}
              </span>{' '}
              out of <span className="font-medium">{totalResults}</span>
            </p>
          ) : null}
          <SearchRecipesSection
            loadMoreRecipes={handleLoadMore}
            loading={isLoading}
            reachedEnd={reachedEnd}
            isError={isError}
            error={error}
            recipes={recipes || []}
          />
        </div>
      </div>
    </main>
  );
}

// to prevent reloading of the page after fetcher action submission (adding to favorites)
export function shouldRevalidate() {
  return false;
}
