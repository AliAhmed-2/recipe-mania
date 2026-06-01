import { SearchInput } from '~/components';
import { SearchBarProps } from './types';

export const SearchBar: React.FC<SearchBarProps> = ({
  handleSearch,
  value = '',
  showSuggestions = true,
  placeholder = 'Search for recipes...',
}) => {
  return (
    <div
      id="hero"
      className="flex-col-center relative h-60 w-full gap-20 bg-search-bg bg-cover bg-center"
    >
      {/* Overlay for background image */}
      <div className="bg-overlay bg-black opacity-50"></div>
      <p className="absolute left-8 top-4 z-10 text-sm text-white">
        Home {'>'} Search
      </p>
      <SearchInput
        handleInputChange={handleSearch}
        value={value}
        showSuggestions={showSuggestions}
        placeholder={placeholder}
      />
    </div>
  );
};
