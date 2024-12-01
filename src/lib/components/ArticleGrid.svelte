<script lang="ts">
  import type { Article } from '../types';
  import ArticleCard from './ArticleCard.svelte';
  import ArticleSkeleton from './ArticleSkeleton.svelte';
  import { bookmarkStore } from '../stores/bookmarkStore';
  import { UI_TEXTS, LAYOUT_CONFIG } from '../constants';

  export let articles: Article[] = [];
  export let viewMode: 'grid' | 'list' = 'list';
  export let isLoading = false;
  export let showFavorites = false;

  $: isMobile = window.innerWidth < LAYOUT_CONFIG.MOBILE_BREAKPOINT;
  $: effectiveViewMode = isMobile ? 'grid' : viewMode;
  $: displayedArticles = showFavorites ? $bookmarkStore : articles;
</script>

<div class="grid grid-cols-1 {effectiveViewMode === 'grid' ? 'md:grid-cols-2' : ''} gap-4 md:gap-8 mb-16">
  {#if isLoading}
    {#each Array(effectiveViewMode === 'list' ? LAYOUT_CONFIG.ARTICLES_PER_PAGE.LIST : LAYOUT_CONFIG.ARTICLES_PER_PAGE.GRID) as _}
      <ArticleSkeleton viewMode={effectiveViewMode} />
    {/each}
  {:else if displayedArticles.length === 0}
    <div class="col-span-full text-center py-12">
      <p class="text-surface-600">
        {showFavorites ? UI_TEXTS.GRID_NO_BOOKMARKS : UI_TEXTS.GRID_NO_ARTICLES}
      </p>
    </div>
  {:else}
    {#each displayedArticles as article (article.id)}
      <ArticleCard 
        viewMode={effectiveViewMode}
        id={article.id}
        imageUrl={article.imageUrl}
        author={article.author}
        title={article.title}
        description={article.description}
        tags={article.tags}
        url={article.url}
        published={article.published}
        source={article.source}
      />
    {/each}
  {/if}
</div>