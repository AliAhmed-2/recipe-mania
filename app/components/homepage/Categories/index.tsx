import { Link } from '@remix-run/react';
import { categories } from './constants';

export function Categories() {
  return (
    <div
      id="categories"
      data-testid="categories"
      className="flex-col-center relative mb-16 h-full w-full gap-14 bg-categories-background bg-cover p-12"
    >
      {/* Overlay for background image */}
      <div className="bg-overlay bg-black opacity-85"></div>
      <h3 className="relative z-10 text-3xl font-medium text-white">
        Categories
      </h3>

      <div className="flex-center flex-wrap gap-8">
        {categories.map((category) => {
          const formattedCategory = category.toLowerCase().replace(/\s/, '');

          return (
            <Link
              key={category}
              data-testid={`category-${formattedCategory}`}
              className={`flex-center group/category relative h-40 w-40 cursor-pointer overflow-hidden rounded-full bg-cover`}
              style={{
                backgroundImage: `url('/images/categories/${formattedCategory}.jpg')`,
              }}
              to={`/search?cuisine=${formattedCategory}`}
            >
              <div className="bg-overlay bg-gray-900 opacity-40 transition group-hover/category:opacity-25"></div>
              <h3 className="relative z-10 text-2xl text-white opacity-80 group-hover/category:opacity-100">
                {category}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
