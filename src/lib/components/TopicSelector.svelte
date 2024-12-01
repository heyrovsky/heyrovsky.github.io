<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { articleStore } from '../stores/articleStore';

  export let selectedTopics: string[] = [];
  export let isFilterLoading = false;
  let topics: string[] = [];
  let isLoading = false;

  const dispatch = createEventDispatcher();

  // Subscribe to articleStore to update topics when articles change
  $: {
    isLoading = true;
    // Get categories and their counts from current articles
    const categoryCount = new Map<string, number>();
    
    $articleStore.forEach(article => {
      (article.item.categories || []).forEach(category => {
        categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
      });
    });

    // Convert to array and sort by frequency
    topics = Array.from(categoryCount.entries())
      .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
      .filter(([_, count]) => count > 1 || categoryCount.size === 1) // Only keep categories with more than one occurrence
      .map(([category]) => category); // Get category names

    isLoading = false;
  }

  function toggleTopic(topic: string) {
    if (selectedTopics.includes(topic)) {
      selectedTopics = selectedTopics.filter(t => t !== topic);
    } else {
      selectedTopics = [...selectedTopics, topic];
    }
    dispatch('select', selectedTopics);
  }
</script>

<div class="w-full relative">
  <div class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-surface-50 to-transparent pointer-events-none z-10"></div>
  <div class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-surface-50 to-transparent pointer-events-none z-10"></div>
  
  <div class="overflow-x-auto scrollbar-hide">
    {#if isLoading || isFilterLoading}
      <div class="flex gap-2 py-2 px-2 whitespace-nowrap">
        {#each Array(8) as _}
          <div class="h-10 w-28 bg-surface-200/50 rounded-xl animate-pulse shrink-0"></div>
        {/each}
      </div>
    {:else if topics.length > 0}
      <div class="flex gap-2 py-2 px-2 whitespace-nowrap">
        {#each topics as topic}
          <button
            class="h-10 px-5 rounded-xl text-sm font-medium transition-colors duration-200
              backdrop-blur-sm shrink-0 border
              {selectedTopics.includes(topic)
                ? 'bg-primary-600 text-white border-primary-600 hover:bg-primary-700 hover:border-primary-700'
                : 'bg-white/80 border-surface-200 hover:border-primary-300 hover:bg-primary-50 text-surface-700'}"
            on:click={() => toggleTopic(topic)}
          >
            {topic}
          </button>
        {/each}
      </div>
    {:else}
      <div class="py-2 px-2 text-surface-500 text-sm">
        No categories available for the current articles
      </div>
    {/if}
  </div>
</div>

<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
</style>