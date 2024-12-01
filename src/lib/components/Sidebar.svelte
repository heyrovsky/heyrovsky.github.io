<script lang="ts">
  import { onMount } from 'svelte';
  import { DataService } from '../services/DataService';
  import { articleStore } from '../stores/articleStore';
  import { filterStore } from '../stores/filterStore';
  import type { Section, NewsItem } from '../types';
  
  export let isOpen = false;
  export let onClose = () => {};
  
  let expandedSections: { [key: string]: boolean } = {};
  let isLoading = true;
  let publications: { name: string; count: number }[] = [];
  let topics: { name: string; count: number }[] = [];
  let authors: { name: string; count: number }[] = [];
  let filteredArticles: NewsItem[] = [];

  onMount(async () => {
    try {
      isLoading = false;
    } catch (error) {
      console.error('Failed to load sidebar sections:', error);
    } finally {
      isLoading = false;
    }
  });

  function capitalize(str: string): string {
    return str.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  // Filter articles based on selected filters
  $: {
    filteredArticles = $articleStore.filter(article => {
      const matchesAuthors = $filterStore.authors.length === 0 || 
        $filterStore.authors.every(author => 
          article.item.authors?.some(a => a.name === author)
        );

      const matchesTopics = $filterStore.topics.length === 0 ||
        $filterStore.topics.every(topic =>
          article.item.categories?.includes(topic)
        );

      const matchesPublications = $filterStore.publications.length === 0 ||
        $filterStore.publications.some(pub =>
          article.item.source === pub
        );

      return matchesAuthors && matchesTopics && matchesPublications;
    });
  }

  // Update counts based on filtered articles
  $: {
    const sourceCount = new Map<string, number>();
    const topicCount = new Map<string, number>();
    const authorCount = new Map<string, number>();

    filteredArticles.forEach(article => {
      if (article.item.source) {
        const source = capitalize(article.item.source);
        sourceCount.set(source, (sourceCount.get(source) || 0) + 1);
      }
      
      (article.item.categories || []).forEach(category => {
        const topic = capitalize(category);
        topicCount.set(topic, (topicCount.get(topic) || 0) + 1);
      });
      
      if (article.item.authors && article.item.authors.length > 0) {
        article.item.authors.forEach(author => {
          if (author.name && author.name !== 'Unknown Author') {
            authorCount.set(author.name, (authorCount.get(author.name) || 0) + 1);
          }
        });
      }
    });

    publications = Array.from(sourceCount.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

    topics = Array.from(topicCount.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

    authors = Array.from(authorCount.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }

  function toggleSection(title: string) {
    expandedSections[title] = !expandedSections[title];
  }

  function getVisibleItems<T>(items: T[], isExpanded: boolean) {
    return isExpanded ? items : items.slice(0, 5);
  }

  function handleItemClick(type: 'authors' | 'topics' | 'publications', value: string) {
    if ($filterStore[type].includes(value)) {
      filterStore.removeFilter(type, value);
    } else {
      filterStore.addFilter(type, value);
    }
  }

  function isSelected(type: 'authors' | 'topics' | 'publications', value: string): boolean {
    return $filterStore[type].includes(value);
  }
</script>

{#if isOpen}
  <div
    class="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden"
    on:click|self={onClose}
  ></div>
{/if}

<aside
  class="sidebar fixed top-0 bg-white/80 backdrop-blur-sm overflow-y-auto z-50 h-screen border-r border-surface-200/50
    {isOpen ? 'left-0' : '-left-64'} md:left-0 w-64 transition-all duration-300"
>
  <!-- Logo -->
  <div class="p-4">
    <span class="text-3xl font-sarina text-primary-600 hover:text-primary-700 transition-colors cursor-pointer">
      NewsFlare
    </span>
  </div>

  <nav class="p-4">
    {#if isLoading}
      {#each Array(3) as _}
        <div class="mb-8">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-5 h-5 bg-surface-200 rounded animate-pulse"></div>
            <div class="h-4 w-24 bg-surface-200 rounded animate-pulse"></div>
          </div>
          <ul class="space-y-2 ml-7">
            {#each Array(5) as _}
              <li>
                <div class="h-8 w-full bg-surface-200 rounded animate-pulse"></div>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    {:else}
      <!-- Authors Section -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-2 text-surface-900">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h3 class="font-medium">Authors</h3>
          </div>
          {#if $filterStore.authors.length > 0}
            <button
              class="text-xs text-primary-600 hover:text-primary-700 font-medium"
              on:click={() => filterStore.clearFilterType('authors')}
            >
              Clear
            </button>
          {/if}
        </div>
        
        {#if authors.length > 0}
          <ul class="space-y-2 ml-7">
            {#each getVisibleItems(authors, !!expandedSections['Authors']) as { name, count }}
              <li>
                <button
                  class="w-full flex items-center justify-between py-2 px-3 text-sm rounded-lg transition-colors group
                    {isSelected('authors', name)
                      ? 'bg-primary-600 text-white'
                      : 'text-surface-600 hover:bg-surface-50 hover:text-primary-600'}"
                  on:click={() => handleItemClick('authors', name)}
                >
                  <span>{name}</span>
                  <span class="px-2 py-0.5 rounded-full text-xs 
                    {isSelected('authors', name)
                      ? 'bg-white/20 text-white'
                      : 'bg-surface-100 text-surface-600 group-hover:bg-primary-100 group-hover:text-primary-700'}">
                    {count}
                  </span>
                </button>
              </li>
            {/each}
            {#if authors.length > 5}
              <li>
                <button 
                  class="py-2 px-3 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  on:click={() => toggleSection('Authors')}
                >
                  {expandedSections['Authors'] ? 'Show less' : 'Show more'}
                </button>
              </li>
            {/if}
          </ul>
        {:else}
          <p class="text-sm text-surface-500 ml-7 py-2">No authors available</p>
        {/if}
      </div>

      <!-- Topics Section -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-2 text-surface-900">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <h3 class="font-medium">Topics</h3>
          </div>
          {#if $filterStore.topics.length > 0}
            <button
              class="text-xs text-primary-600 hover:text-primary-700 font-medium"
              on:click={() => filterStore.clearFilterType('topics')}
            >
              Clear
            </button>
          {/if}
        </div>
        
        {#if topics.length > 0}
          <ul class="space-y-2 ml-7">
            {#each getVisibleItems(topics, !!expandedSections['Topics']) as { name, count }}
              <li>
                <button
                  class="w-full flex items-center justify-between py-2 px-3 text-sm rounded-lg transition-colors group
                    {isSelected('topics', name)
                      ? 'bg-primary-600 text-white'
                      : 'text-surface-600 hover:bg-surface-50 hover:text-primary-600'}"
                  on:click={() => handleItemClick('topics', name)}
                >
                  <span>{name}</span>
                  <span class="px-2 py-0.5 rounded-full text-xs 
                    {isSelected('topics', name)
                      ? 'bg-white/20 text-white'
                      : 'bg-surface-100 text-surface-600 group-hover:bg-primary-100 group-hover:text-primary-700'}">
                    {count}
                  </span>
                </button>
              </li>
            {/each}
            {#if topics.length > 5}
              <li>
                <button 
                  class="py-2 px-3 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  on:click={() => toggleSection('Topics')}
                >
                  {expandedSections['Topics'] ? 'Show less' : 'Show more'}
                </button>
              </li>
            {/if}
          </ul>
        {:else}
          <p class="text-sm text-surface-500 ml-7 py-2">No topics available</p>
        {/if}
      </div>

      <!-- Publications Section -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-2 text-surface-900">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
            </svg>
            <h3 class="font-medium">Publications</h3>
          </div>
          {#if $filterStore.publications.length > 0}
            <button
              class="text-xs text-primary-600 hover:text-primary-700 font-medium"
              on:click={() => filterStore.clearFilterType('publications')}
            >
              Clear
            </button>
          {/if}
        </div>
        
        {#if publications.length > 0}
          <ul class="space-y-2 ml-7">
            {#each getVisibleItems(publications, !!expandedSections['Publications']) as { name, count }}
              <li>
                <button
                  class="w-full flex items-center justify-between py-2 px-3 text-sm rounded-lg transition-colors group
                    {isSelected('publications', name)
                      ? 'bg-primary-600 text-white'
                      : 'text-surface-600 hover:bg-surface-50 hover:text-primary-600'}"
                  on:click={() => handleItemClick('publications', name)}
                >
                  <span>{name}</span>
                  <span class="px-2 py-0.5 rounded-full text-xs 
                    {isSelected('publications', name)
                      ? 'bg-white/20 text-white'
                      : 'bg-surface-100 text-surface-600 group-hover:bg-primary-100 group-hover:text-primary-700'}">
                    {count}
                  </span>
                </button>
              </li>
            {/each}
            {#if publications.length > 5}
              <li>
                <button 
                  class="py-2 px-3 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  on:click={() => toggleSection('Publications')}
                >
                  {expandedSections['Publications'] ? 'Show less' : 'Show more'}
                </button>
              </li>
            {/if}
          </ul>
        {:else}
          <p class="text-sm text-surface-500 ml-7 py-2">No publications available</p>
        {/if}
      </div>
    {/if}

    <!-- Footer Links -->
    <div class="mt-8 pt-6 border-t border-surface-200">
      <div class="flex flex-wrap gap-x-4 gap-y-2 text-sm text-surface-500">
        <a href="/" class="hover:text-primary-600 transition-colors">Help</a>
        <a href="/" class="hover:text-primary-600 transition-colors">License</a>
      </div>
    </div>
  </nav>
</aside>