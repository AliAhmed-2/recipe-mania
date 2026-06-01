import { SelectedFiltersData } from '~/interfaces';

export interface FiltersProps {
  setFilters: React.Dispatch<React.SetStateAction<SelectedFiltersData>>;
  preSelected: SelectedFiltersData;
}
