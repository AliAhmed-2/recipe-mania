export interface SearchBarProps {
  handleSearch: (keyword: string) => void;
  value?: string;
  showSuggestions?: boolean;
  placeholder?: string;
}
