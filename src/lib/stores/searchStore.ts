import { writable, derived } from 'svelte/store';
import { articleStore } from './articleStore';
import type { NewsItem } from '../types';

export const searchStore = writable<string>('');

// Derived store for search results
export const searchResults = derived(
  [articleStore, searchStore],
  ([$articles, $searchTerm]) => {
    if (!$searchTerm) return $articles;

    const searchLower = $searchTerm.toLowerCase();
    return $articles.filter(article => 
      article.item.title.toLowerCase().includes(searchLower) ||
      article.item.description.toLowerCase().includes(searchLower) ||
      article.item.authors?.some(author => 
        author.name.toLowerCase().includes(searchLower)
      ) ||
      article.item.source?.toLowerCase().includes(searchLower) ||
      article.item.categories?.some(category => 
        category.toLowerCase().includes(searchLower)
      )
    );
  }
);