import React from 'react';
import FilterGroup from './FilterGroup';
import Chips from '../Chips';
import { SelectedFiltersData } from '~/interfaces';
import { FiltersProps } from './types';
import { cuisineOptions, dietOptions, mealOptions } from './constants';

export const Filters: React.FC<FiltersProps> = ({
  setFilters,
  preSelected,
}) => {
  const handleFilterChange = (
    filterKey: keyof SelectedFiltersData,
    selectedOptions: string[],
  ) => {
    setFilters((prevFilters: SelectedFiltersData) => {
      return {
        ...prevFilters,
        [filterKey]: selectedOptions,
      };
    });
  };

  return (
    <div className="grid w-full grid-cols-3 gap-4 rounded pr-2 sm:flex sm:w-[20%] sm:max-w-sm sm:flex-col sm:gap-0 2xl:w-[28rem]">
      <Chips
        title="Meal Type"
        icon={true}
        iconPath="meals/"
        options={mealOptions}
        preSelected={preSelected.type}
        onChange={(selectedOptions) =>
          handleFilterChange('type', selectedOptions)
        }
      />
      <FilterGroup
        title="Cuisine Type"
        options={cuisineOptions}
        preSelected={preSelected.cuisine}
        onChange={(selectedOptions) =>
          handleFilterChange('cuisine', selectedOptions)
        }
      />
      <Chips
        title="Diet Preferences"
        options={dietOptions}
        preSelected={preSelected.diet}
        onChange={(selectedOptions) =>
          handleFilterChange('diet', selectedOptions)
        }
      />
    </div>
  );
};
