<script lang="ts">
  import { onMount } from 'svelte';
  import { DataService } from './lib/services/DataService';
  import { articleStore, getTopCategories } from './lib/stores/articleStore';
  import { filterStore } from './lib/stores/filterStore';
  import { searchStore } from './lib/stores/searchStore';
  import Header from './lib/components/Header.svelte';
  import Sidebar from './lib/components/Sidebar.svelte';
  import SearchBar from './lib/components/SearchBar.svelte';
  import ArticleGrid from './lib/components/ArticleGrid.svelte';
  import TopicSelector from './lib/components/TopicSelector.svelte';
  import Pagination from './lib/components/Pagination.svelte';
  import type { Article } from './lib/types';
  import { format, startOfToday } from 'date-fns';

  const dataService = DataService.getInstance();

  let currentPage = 1;
  let selectedTopics: string[] = [];
  let isSidebarOpen = false;
  let isSearchOpen = false;
  let showFavorites = false;
  let isLoading = true;
  let displayedArticles: Article[] = [];
  let totalPages = 1;
  let mainContentRef: HTMLElement;
  let selectedDate = startOfToday();
  let currentDisplayDate = selectedDate;
  let isFilterLoading = false;
  let viewMode: 'grid' | 'list' = window.innerWidth < 768 ? 'grid' : 'list';

  onMount(async () => {
    try {
      await dataService.fetchArticles(selectedDate);
      await loadArticles(currentPage);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    } catch (error) {
      console.error('Failed to load articles:', error);
    }
  });

  function handleResize() {
    viewMode = window.innerWidth < 768 ? 'grid' : 'list';
    loadArticles(currentPage);
  }

  function handleSearch(event: CustomEvent<string>) {
    searchStore.set(event.detail);
    currentPage = 1;
    loadArticles(currentPage);
  }

  function handleViewChange(event: CustomEvent<'grid' | 'list'>) {
    if (window.innerWidth >= 768) {
      viewMode = event.detail;
      currentPage = 1;
      loadArticles(currentPage);
    }
  }

  function handleToggleFavorites() {
    showFavorites = !showFavorites;
    currentPage = 1;
    loadArticles(currentPage);
  }

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }

  function handleMainClick(event: MouseEvent) {
    if (window.innerWidth < 768 && isSidebarOpen) {
      const target = event.target as HTMLElement;
      if (!target.closest('.sidebar') && !target.closest('.sidebar-toggle')) {
        isSidebarOpen = false;
      }
    }
  }

  async function handleDateSelect(event: CustomEvent<Date>) {
    selectedDate = event.detail;
    isLoading = true;
    await dataService.fetchArticles(selectedDate);
    await loadArticles(currentPage);
  }

  async function handleTopicSelect(event: CustomEvent<string[]>) {
    selectedTopics = event.detail;
    isFilterLoading = true;
    currentPage = 1;
    await loadArticles(currentPage);
    isFilterLoading = false;
  }

  async function loadArticles(page: number) {
    if (showFavorites) {
      isLoading = false;
      return;
    }

    isLoading = true;
    displayedArticles = [];
    
    await new Promise(resolve => setTimeout(resolve, 300));

    // Get top categories from the entire dataset
    const topCategories = getTopCategories($articleStore);

    // Map NewsItems to Articles format and sort them
    let filteredArticles = ($articleStore || [])
      .map(({ hash, item }) => {
        const categories = item.categories || [];
        const displayCategories = categories.length > 3 
          ? categories.filter(cat => topCategories.includes(cat)).slice(0, 3)
          : categories;

        return {
          id: hash,
          imageUrl: item.image?.url || '/default-image.jpg',
          author: item.authors?.[0]?.name || 'Unknown Author',
          title: item.title,
          description: item.description.replace(/<[^>]*>/g, ''),
          tags: displayCategories.map(category => ({
            text: category,
            variant: 'primary' as const
          })),
          url: item.links?.[0] || '#',
          published: item.published,
          categories: item.categories || [],
          source: item.source || 'Unknown Source',
          hasImage: !!item.image?.url
        };
      })
      .sort((a, b) => {
        // First, sort by image presence
        if (a.hasImage && !b.hasImage) return -1;
        if (!a.hasImage && b.hasImage) return 1;
        
        // Then, sort by publication date (most recent first)
        return new Date(b.published).getTime() - new Date(a.published).getTime();
      });

    // Apply search filter
    if ($searchStore) {
      const searchTerm = $searchStore.toLowerCase();
      filteredArticles = filteredArticles.filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.description.toLowerCase().includes(searchTerm) ||
        article.author.toLowerCase().includes(searchTerm) ||
        article.source.toLowerCase().includes(searchTerm) ||
        article.categories.some(cat => cat.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply filters from filterStore
    if ($filterStore.authors.length > 0 || $filterStore.topics.length > 0 || $filterStore.publications.length > 0) {
      filteredArticles = filteredArticles.filter(article => {
        const matchesAuthors = $filterStore.authors.length === 0 || 
          $filterStore.authors.includes(article.author);

        const matchesTopics = $filterStore.topics.length === 0 ||
          $filterStore.topics.every(topic =>
            article.categories.includes(topic)
          );

        const matchesPublications = $filterStore.publications.length === 0 ||
          $filterStore.publications.includes(article.source);

        return matchesAuthors && matchesTopics && matchesPublications;
      });
    }

    // Update the current display date from the first article if available
    if (filteredArticles.length > 0 && filteredArticles[0].published) {
      currentDisplayDate = new Date(filteredArticles[0].published);
    }

    const articlesPerPage = viewMode === 'list' ? 6 : 12;
    const start = (page - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    
    totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    displayedArticles = filteredArticles.slice(start, end);
    isLoading = false;
  }

  // Subscribe to filterStore and searchStore changes
  $: {
    if ($filterStore || $searchStore) {
      loadArticles(currentPage);
    }
  }
</script>

<main 
  bind:this={mainContentRef}
  class="min-h-screen bg-slate-50" 
  on:click={handleMainClick}
>
  <Header
    {showFavorites}
    {viewMode}
    {isSearchOpen}
    {isSidebarOpen}
    displayDate={currentDisplayDate}
    on:toggleSidebar={toggleSidebar}
    on:toggleFavorites={handleToggleFavorites}
    on:toggleSearch={() => isSearchOpen = !isSearchOpen}
    on:viewChange={handleViewChange}
    on:dateSelect={handleDateSelect}
  />

  <div class="pt-16 md:pt-16 md:pl-64">
    <div class="max-w-7xl mx-auto px-4 md:px-6 py-4">
      {#if !showFavorites}
        <div class="mb-6">
          <TopicSelector 
            bind:selectedTopics 
            on:select={handleTopicSelect}
            {isFilterLoading}
          />
        </div>
      {/if}

      <ArticleGrid
        articles={displayedArticles}
        {viewMode}
        {showFavorites}
        isLoading={isLoading || isFilterLoading}
      />

      {#if !showFavorites}
        <div class="flex justify-center">
          <Pagination bind:currentPage {totalPages} isLoading={isLoading || isFilterLoading} />
        </div>
      {/if}
    </div>
  </div>

  <Sidebar isOpen={isSidebarOpen} onClose={() => isSidebarOpen = false} />

  {#if isSearchOpen}
    <SearchBar 
      on:search={handleSearch} 
      on:viewChange={handleViewChange}
      on:toggleFavorites={handleToggleFavorites}
      {isSearchOpen}
      {showFavorites}
      {viewMode}
      isMobile={true}
    />
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: rgb(248, 250, 252);
  }
</style>