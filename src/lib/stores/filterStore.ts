import { writable, derived } from 'svelte/store';
import type { Filter } from '../types';

function createFilterStore() {
  const { subscribe, set, update } = writable<Filter>({
    authors: [],
    topics: [],
    publications: []
  });

  return {
    subscribe,
    addFilter: (type: keyof Filter, value: string) => update(filters => {
      if (!filters[type].includes(value)) {
        return { ...filters, [type]: [...filters[type], value] };
      }
      return filters;
    }),
    removeFilter: (type: keyof Filter, value: string) => update(filters => ({
      ...filters,
      [type]: filters[type].filter(item => item !== value)
    })),
    clearFilters: () => set({ authors: [], topics: [], publications: [] }),
    clearFilterType: (type: keyof Filter) => update(filters => ({
      ...filters,
      [type]: []
    }))
  };
}

export const filterStore = createFilterStore();

// Derived store to check if any filters are active
export const hasActiveFilters = derived(
  filterStore,
  $filters => $filters.authors.length > 0 || 
              $filters.topics.length > 0 || 
              $filters.publications.length > 0
);