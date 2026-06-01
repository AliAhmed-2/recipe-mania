import { useFetch } from '..';
import { searchSuggestionsType, suggestionsSchema } from './schema';

const useGetSearchSuggestions = (keyword: string) => {
  const query = `/recipes/autocomplete?number=10&query=${keyword}`;

  return useFetch<searchSuggestionsType>(
    query,
    suggestionsSchema,
    { method: 'GET' },
    {
      queryKey: ['getSearchSuggestions', keyword],
      staleTime: 1000 * 60 * 60,
      enabled: !!keyword,
    },
  );
};

export default useGetSearchSuggestions;
