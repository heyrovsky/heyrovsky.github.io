import type { NewsItem } from '../types/index';
import { articleStore } from '../stores/articleStore';
import { format, subDays, startOfToday } from 'date-fns';
import { API_CONFIG, DATE_FORMATS } from '../constants';

export class DataService {
  private static instance: DataService;
  private readonly baseUrl = API_CONFIG.BASE_URL;
  private readonly maxRetries = API_CONFIG.MAX_RETRIES;

  private constructor() {}

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  private formatDate(date: Date): string {
    const month = format(date, 'MMMM-yyyy');
    const day = date.getDate(); // Get day without leading zero
    const monthNum = date.getMonth() + 1; // Get month number (1-12)
    const year = date.getFullYear();
    return `${month}/${day}-${monthNum}-${year}.json`;
  }

  async fetchArticles(date: Date = startOfToday()): Promise<void> {
    let currentDate = date;
    let retryCount = 0;

    while (retryCount < this.maxRetries) {
      try {
        const path = this.formatDate(currentDate);
        const url = `${this.baseUrl}/${path}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.status}`);
        }

        const newsItems: NewsItem[] = await response.json();
        if (newsItems?.length > 0) {
          articleStore.set(newsItems);
          return;
        }

        currentDate = subDays(currentDate, 1);
        retryCount++;
        
      } catch (error) {
        console.error(`Error fetching articles for ${format(currentDate, DATE_FORMATS.DISPLAY_DATE)}:`, error);
        currentDate = subDays(currentDate, 1);
        retryCount++;
        
        if (retryCount === this.maxRetries) {
          console.error('Error fetching articles after multiple retries:', error);
          articleStore.set([]);
          return;
        }
      }
    }

    console.error('No articles found in the last 7 days');
    articleStore.set([]);
  }
}