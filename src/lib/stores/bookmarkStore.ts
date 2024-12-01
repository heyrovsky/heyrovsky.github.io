import { writable } from 'svelte/store';
import type { Article } from '../types';
import { STORAGE_KEYS } from '../constants';

function createBookmarkStore() {
  const storedBookmarks = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
  const initialBookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];

  const { subscribe, update } = writable<Article[]>(initialBookmarks);

  const saveToStorage = (bookmarks: Article[]) => {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  };

  return {
    subscribe,
    toggleBookmark: (article: Article) => {
      update(bookmarks => {
        const exists = bookmarks.some(b => b.id === article.id);
        const newBookmarks = exists 
          ? bookmarks.filter(b => b.id !== article.id)
          : [...bookmarks, article];
        
        saveToStorage(newBookmarks);
        return newBookmarks;
      });
    },
    isBookmarked: (id: string | number) => {
      const bookmarks = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || '[]');
      return bookmarks.some((b: Article) => b.id === id);
    }
  };
}

export const bookmarkStore = createBookmarkStore();