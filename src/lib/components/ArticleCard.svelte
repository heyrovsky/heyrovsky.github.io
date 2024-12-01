<script lang="ts">
  import Badge from './Badge.svelte';
  import { formatDistanceToNow } from 'date-fns';
  import { bookmarkStore } from '../stores/bookmarkStore';

  export let viewMode: 'grid' | 'list';
  export let imageUrl: string;
  export let author: string;
  export let title: string;
  export let description: string;
  export let tags: { text: string; variant?: 'primary' | 'secondary' }[];
  export let url: string;
  export let source: string;
  export let published: string;
  export let id: string | number;

  $: relativeTime = formatDistanceToNow(new Date(published), { addSuffix: true });
  $: formattedSource = source ? source.replace(/^www\./i, '').replace(/\.com$/i, '') : 'Unknown Source';
  $: displayAuthor = author !== 'Unknown Author' ? author : formattedSource;
  $: showPublication = author !== 'Unknown Author';
  $: isBookmarked = $bookmarkStore.some(b => b.id === id);

  function handleClick() {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function handleBookmark(event: MouseEvent) {
    event.stopPropagation();
    const article = {
      id,
      imageUrl,
      author,
      title,
      description,
      tags,
      url,
      source,
      published,
      hasImage: !!imageUrl
    };
    bookmarkStore.toggleBookmark(article);
  }
</script>

<article 
  class="group premium-card overflow-hidden {viewMode === 'list' ? 'sm:flex' : ''} cursor-pointer
  hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
  on:click={handleClick}
  on:keydown={(e) => e.key === 'Enter' && handleClick()}
  tabindex="0"
  role="article"
>
  <div class="relative {viewMode === 'list' ? 'sm:w-[280px]' : 'pb-[56.25%]'} overflow-hidden">
    <img
      src={imageUrl}
      alt=""
      class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
    <div class="absolute bottom-3 left-3 flex gap-1.5 flex-wrap max-w-[calc(100%-24px)]">
      {#each tags as tag}
        <Badge text={tag.text} variant={tag.variant} />
      {/each}
    </div>
    <button 
      class="absolute top-3 right-3 p-2 rounded-xl bg-white/90 hover:bg-white text-surface-600 
      hover:text-primary-600 transition-colors backdrop-blur-sm"
      on:click={handleBookmark}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
      </svg>
    </button>
  </div>

  <div class="flex-1 p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="flex flex-col">
        <span class="text-sm font-medium text-surface-900">{displayAuthor}</span>
        {#if showPublication}
          <span class="text-xs text-surface-500">{formattedSource}</span>
        {/if}
      </div>
    </div>

    <h3 class="text-xl font-medium mb-3 text-surface-900 group-hover:text-primary-600 transition-colors line-clamp-2">
      {title}
    </h3>

    <p class="text-surface-600 text-sm mb-6 line-clamp-2">
      {description}
    </p>

    <div class="flex items-center text-sm text-surface-500">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{relativeTime}</span>
    </div>
  </div>
</article>

<style>
  article:focus {
    outline: 2px solid theme(colors.primary.600);
    outline-offset: 2px;
  }

  article:focus:not(:focus-visible) {
    outline: none;
  }
</style>