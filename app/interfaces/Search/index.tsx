export interface OptionInterface {
  value: string;
  label: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterGroupProps {
  title?: string;
  options: FilterOption[];
  onChange: (selectedOptions: string[]) => void;
  icon?: boolean;
  iconPath?: string;
  disabled?: boolean;
  page?: 'search' | 'profile';
  preSelected?: string[];
}

export interface SelectedFiltersData {
  cuisine: string[];
  diet: string[];
  type: string[];
}
