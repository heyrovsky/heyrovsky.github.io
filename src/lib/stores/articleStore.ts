import { writable, derived } from 'svelte/store';
import type { NewsItem } from '../types';

// Main article store
function createArticleStore() {
  const { subscribe, set, update } = writable<NewsItem[]>([]);

  return {
    subscribe,
    set,
    update,
    reset: () => set([])
  };
}

export const articleStore = createArticleStore();

// Derived store for filtered articles
export const filteredArticleStore = derived(
  articleStore,
  $articles => {
    return $articles.sort((a, b) => {
      // First, sort by image presence
      if (a.item.image?.url && !b.item.image?.url) return -1;
      if (!a.item.image?.url && b.item.image?.url) return 1;
      
      // Then by publication date
      return new Date(b.item.published).getTime() - new Date(a.item.published).getTime();
    });
  }
);

// Helper function to get top categories
export function getTopCategories(articles: NewsItem[]): string[] {
  const categoryCount = new Map<string, number>();
  
  articles.forEach(article => {
    (article.item.categories || []).forEach(category => {
      categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
    });
  });

  return Array.from(categoryCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category);
}