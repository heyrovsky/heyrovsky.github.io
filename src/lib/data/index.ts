import type { Article, Section } from '../types';

export const articles: Article[] = Array(100).fill(null).map((_, i) => ({
  id: i + 1,
  imageUrl: `https://picsum.photos/seed/${i + 1}/800/450`,
  author: 'John Doe',
  readTime: '5 min read',
  title: 'The Future of Technology: A Deep Dive into AI and Machine Learning',
  description: 'Explore the latest developments in artificial intelligence and machine learning, and how they\'re reshaping our world...',
  tags: [
    { text: 'Technology' },
    { text: 'AI', variant: 'secondary' }
  ],
  url: '#'
}));

export const sidebarSections: Section[] = [
  {
    title: 'Following',
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>`,
    items: ['Technology', 'Programming', 'Data Science', 'Machine Learning', 'Software Engineering', 'Blockchain', 'Cybersecurity', 'Cloud Computing']
  },
  {
    title: 'Trending Topics',
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>`,
    items: ['AI & Future', 'Web3', 'Climate Change', 'Mental Health', 'Remote Work', 'Startup', 'Innovation', 'Leadership']
  },
  {
    title: 'Popular Publications',
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
          </svg>`,
    items: ['Better Programming', 'Towards Data Science', 'UX Collective', 'The Startup', 'OneZero', 'Marker', 'Elemental', 'Level Up Coding']
  }
];

export const topics = [
  'Technology', 'Science', 'Business', 'Culture', 
  'Politics', 'Health', 'Climate', 'Innovation',
  'Art', 'Education', 'Food', 'Travel'
];

export const popularSearches = [
  'Artificial Intelligence',
  'Web Development',
  'Climate Change',
  'Mental Health',
  'Productivity'
];