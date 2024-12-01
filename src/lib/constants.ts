// App Configuration
export const APP_NAME = 'Flare';
export const APP_DESCRIPTION = 'Next generation news aggregator';

// UI Text
export const UI_TEXTS = {
  // Headers
  HEADER_SEARCH_PLACEHOLDER: 'Search articles...',
  HEADER_CLEAR_BUTTON: 'Clear',
  
  // Sidebar
  SIDEBAR_AUTHORS_TITLE: 'Authors',
  SIDEBAR_TOPICS_TITLE: 'Topics',
  SIDEBAR_PUBLICATIONS_TITLE: 'Publications',
  SIDEBAR_CLEAR_BUTTON: 'Clear',
  SIDEBAR_SHOW_MORE: 'Show more',
  SIDEBAR_SHOW_LESS: 'Show less',
  SIDEBAR_NO_AUTHORS: 'No authors available',
  SIDEBAR_NO_TOPICS: 'No topics available',
  SIDEBAR_NO_PUBLICATIONS: 'No publications available',
  
  // Article Grid
  GRID_NO_ARTICLES: 'No articles found',
  GRID_NO_BOOKMARKS: 'No bookmarked articles yet',
  
  // Calendar
  CALENDAR_TITLE: 'Select Date',
  CALENDAR_WEEKDAYS: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  
  // Footer
  FOOTER_HELP: 'Help',
  FOOTER_LICENSE: 'License',

  // Buttons
  BUTTON_HOME: 'Show all articles',
  BUTTON_FAVORITES: 'Show favorites',
  BUTTON_GRID_VIEW: 'Switch to grid view',
  BUTTON_LIST_VIEW: 'Switch to list view',
  BUTTON_CALENDAR: 'Calendar'
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  BOOKMARKS: 'bookmarkedArticles'
} as const;

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://raw.githubusercontent.com/heyrovsky/rss-repo/main/feeds',
  MAX_RETRIES: 7
} as const;

// Layout Configuration
export const LAYOUT_CONFIG = {
  MOBILE_BREAKPOINT: 768,
  ARTICLES_PER_PAGE: {
    GRID: 12,
    LIST: 6
  }
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY_DATE: 'MMMM d, yyyy',
  URL_DATE: 'MMMM-yyyy/dd-MM-yyyy',
  RELATIVE_DATE: 'MMM d, yyyy'
} as const;