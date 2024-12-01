<script lang="ts">
  import CalendarButton from './CalendarButton.svelte';
  import SearchBar from './SearchBar.svelte';
  import { createEventDispatcher } from 'svelte';
  import { format } from 'date-fns';

  export let showFavorites = false;
  export let viewMode: 'grid' | 'list' = 'list';
  export let isSearchOpen = false;
  export let isSidebarOpen = false;
  export let displayDate: Date | null = null;

  const dispatch = createEventDispatcher();
</script>

<header class="border-b bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-40 shadow-premium md:pl-64">
  <div class="max-w-7xl mx-auto px-4 md:px-6 py-2 md:py-3">
    <!-- Mobile Header -->
    <div class="flex items-center justify-between h-12 md:hidden">
      <div class="text-2xl font-sarina text-primary-600">NewsFlare</div>
      <div class="flex items-center gap-1">
        <div class="flex items-center">
          <CalendarButton on:select={(e) => dispatch('dateSelect', e.detail)} selectedDate={displayDate} />
        </div>
        <button
          class="premium-icon-button"
          on:click={() => dispatch('toggleFavorites')}
          aria-label={showFavorites ? "Show all articles" : "Show favorites"}
        >
          {#if !showFavorites}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          {/if}
        </button>
        <button
          class="premium-icon-button"
          on:click={() => dispatch('toggleSearch')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button
          class="premium-icon-button sidebar-toggle"
          on:click={() => dispatch('toggleSidebar')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Desktop Header -->
    <div class="hidden md:flex items-center space-x-4">
      <CalendarButton on:select={(e) => dispatch('dateSelect', e.detail)} selectedDate={displayDate} />
      <div class="flex-1">
        <SearchBar 
          on:search 
          on:viewChange
          on:toggleFavorites
          {isSearchOpen}
          {showFavorites}
          {viewMode}
        />
      </div>
    </div>
  </div>
</header>