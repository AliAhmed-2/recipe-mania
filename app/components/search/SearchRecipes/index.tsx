import { useCallback, useEffect, useRef, useState } from 'react';
import { useOutletContext } from '@remix-run/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import ClipLoader from 'react-spinners/ClipLoader';
import * as Sentry from '@sentry/remix';
import { SearchRecipesProps } from './types';
import { RecipeCard } from '~/components';
import { debounce } from '~/utils';
import { User } from '~/interfaces';

export const SearchRecipes: React.FC<SearchRecipesProps> = ({
  recipes,
  loading,
  loadMoreRecipes,
  // reachedEnd,
  // isError,
  error,
}) => {
  const [user] = useOutletContext<[User | null]>();

  const [itemsPerRow, setItemsPerRow] = useState(3);
  const [rowHeight, setRowHeight] = useState(380);

  // Resize handler
  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    if (width > 1600) {
      setItemsPerRow(3);
    } else if (width <= 1600 && width > 1200) {
      setItemsPerRow(2);
      setRowHeight(380);
    } else if (width <= 1200 && width > 392) {
      setRowHeight(280);
      setItemsPerRow(2);
    } else {
      setItemsPerRow(1);
    }

    if (width <= 600) {
      setRowHeight(250);
    }
    if (width <= 450) {
      setRowHeight(230);
    }
  }, []);

  // Apply debouncing on wundow resize
  const debouncedResize = useCallback(debounce(handleResize, 200), [
    handleResize,
  ]);

  useEffect(() => {
    window.addEventListener('resize', debouncedResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, [debouncedResize, handleResize]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const recipesVirtualizer = useVirtualizer({
    // adding an extra row if there are more recipes
    count:
      recipes.length % itemsPerRow
        ? recipes.length / itemsPerRow + 1
        : recipes.length / itemsPerRow,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => rowHeight,
    overscan: 5,
  });
  const handleScroll = () => {
    if (loading) return;
    const element = scrollContainerRef.current;
    if (element) {
      const scrollPosition = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;

      if (scrollPosition + clientHeight >= scrollHeight * 0.9) {
        loadMoreRecipes();
      }
    }
  };

  if (!recipes.length) {
    return (
      <div className="flex-center h-[50vh] w-full italic text-gray-500">
        No recipes found. Please try a different keyword 🍕
      </div>
    );
  } else if (error) {
    Sentry.withScope((scope) => {
      scope.setContext('component', { name: 'RecipeList' });
      scope.setExtra('recipesCount', recipes.length);
      Sentry.captureException(error);
    });

    return (
      <div className="flex-col-center h-[40vh] w-full gap-6 italic text-gray-500">
        <img
          src="/images/error.png"
          alt=""
          className="h-72 w-72"
        />
        {error.toString()} 🍕
      </div>
    );
  } else {
    const totalRows = Math.ceil(recipes.length / itemsPerRow);

    const totalHeight = totalRows * rowHeight;
    return (
      <div className="">
        <div
          className="flex h-full max-h-[85vh] w-full flex-col overflow-y-scroll py-4"
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          <div
            style={{
              height: `${totalHeight}px`,
              width: '100%',
              position: 'relative',
            }}
            className="flex flex-col gap-y-6"
          >
            {recipesVirtualizer.getVirtualItems().map((virtualRow) => {
              return (
                <div
                  key={virtualRow.index}
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                    height: `${rowHeight}px`,
                  }}
                  className="absolute left-0 top-0 flex w-full justify-center gap-x-4 pb-8 xs:gap-2 sm:gap-4 md:gap-8"
                >
                  {Array.from({ length: itemsPerRow }).map((_, columnIndex) => {
                    const itemIndex =
                      virtualRow.index * itemsPerRow + columnIndex;
                    if (itemIndex >= recipes.length) return null;
                    const recipe = recipes[itemIndex];
                    return (
                      <RecipeCard
                        key={recipe.id}
                        id={recipe.id}
                        image={recipe.image || ''}
                        title={recipe.title}
                        cookingTime={recipe.readyInMinutes}
                        servings={recipe.servings}
                        score={recipe.spoonacularScore}
                        healthy={recipe.healthScore > 20}
                        dairyFree={recipe.dairyFree}
                        pricePerServing={recipe.pricePerServing}
                        user={user}
                        favorite={
                          user?.favorite_recipes.includes(recipe.id) || false
                        }
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`flex-center w-full py-2 transition-opacity ${loading ? 'opacity-100' : 'opacity-0'}`}
        >
          <ClipLoader
            color={'#C57D5D'}
            loading={true}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    );
  }
};
