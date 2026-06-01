import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import { SearchInputProps } from './types';
import useGetSearchSuggestions from '~/services/Recipes/getSearchSuggestions';
import { debounce } from '~/utils';

export const SearchInput: React.FC<SearchInputProps> = ({
  handleInputChange,
  value = '',
  showSearchButton = false,
  showSuggestions: showSearchSuggestions,
  placeholder,
}) => {
  const [keyword, setKeyword] = useState<string>();
  const [suggestionKeyword, setSuggestionKeyword] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const { data: suggestions } = useGetSearchSuggestions(suggestionKeyword);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const debouncedSetSuggestionKeyword = useCallback(
    debounce((keyword: string) => {
      setSuggestionKeyword(keyword);
    }, 500),
    [],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowSuggestions]);

  useEffect(() => {
    if (keyword?.trim()) {
      debouncedSetSuggestionKeyword(keyword);
    }
  }, [keyword, debouncedSetSuggestionKeyword]);

  const onInputChange = (event: { target: { value: string } }) => {
    if (handleInputChange) handleInputChange(event.target.value);
    if (showSearchSuggestions) setKeyword(event.target.value);
  };

  const handleClear = () => {
    setKeyword('');
    if (handleInputChange) handleInputChange('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setKeyword(suggestion);
  };

  return (
    <div
      ref={containerRef}
      className="flex-col-center relative w-full max-w-2xl px-4"
    >
      <div className={`absolute inset-y-0 left-6 flex items-center pl-3`}>
        <FaSearch className="text-gray-400" />
      </div>
      <input
        type="text"
        name="search-query"
        defaultValue={value}
        value={keyword}
        autoComplete="off"
        autoFocus
        onChange={onInputChange}
        className="w-full rounded-full border border-gray-300 bg-white py-4 pl-12 pr-4 text-black focus:outline-none focus:ring-2 focus:ring-primary-500"
        placeholder={placeholder}
        onFocus={() => setShowSuggestions(true)}
      />
      <div
        className={`absolute inset-y-0 flex cursor-pointer items-center pl-3 ${showSearchButton ? 'right-16' : 'right-8'}`}
        onBlur={() => setShowSuggestions(false)}
      >
        <IoIosClose
          className={`text-4xl text-gray-500 transition-opacity ${keyword?.length ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => handleClear()}
          data-testid="clear-button"
        />
      </div>
      {showSearchButton && (
        <button
          type="submit"
          name="search"
          aria-label="search"
          className={`absolute right-6 top-2 rounded-full bg-primary-500 p-3 transition-opacity ${keyword?.length ? 'opacity-100' : 'opacity-0'}`}
        >
          <FaSearch className="text-white" />
        </button>
      )}

      {keyword?.length && showSuggestions && suggestions?.length ? (
        <div className="absolute top-16 z-50 mx-2 flex w-full max-w-[38rem] flex-col gap-1 rounded border border-gray-200 bg-white p-1 shadow-lg">
          {suggestions?.map((suggestion) => {
            const suggestedWord = keyword
              ? suggestion.title.split(keyword?.toLowerCase())[1]
              : suggestion.title;

            if (!suggestedWord?.length) return;

            return (
              <div
                className="flex cursor-pointer items-center gap-2 px-2 py-1 text-sm transition-colors hover:bg-primary-50"
                onClick={() => handleSuggestionClick(suggestion.title)}
              >
                <IoSearchOutline />
                <p>
                  <span>{keyword}</span>
                  {suggestedWord && (
                    <span className="opacity-50">{suggestedWord}</span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
