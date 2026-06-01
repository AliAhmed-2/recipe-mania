export interface SearchInputProps {
  handleInputChange?: (keyword: string) => void;
  showSearchButton?: boolean;
  value?: string;
  showSuggestions: boolean;
  placeholder: string;
}
