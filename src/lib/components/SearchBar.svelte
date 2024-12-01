<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { searchStore } from '../stores/searchStore';
  
  export let isSearchOpen = false;
  export let showFavorites = false;
  export let isMobile = false;
  export let viewMode: 'grid' | 'list' = 'grid';
  
  const dispatch = createEventDispatcher();
  let searchValue = $searchStore;

  function handleSubmit() {
    searchStore.set(searchValue);
    dispatch('search', searchValue);
    if (isMobile) {
      isSearchOpen = false;
    }
  }

  function handleInput() {
    searchStore.set(searchValue);
    dispatch('search', searchValue);
  }

  function clearSearch() {
    searchValue = '';
    searchStore.set('');
    dispatch('search', '');
  }
</script>

{#if isMobile && isSearchOpen}
  <div class="fixed inset-0 bg-white/80 backdrop-blur-md z-50">
    <div class="p-4">
      <div class="flex items-center space-x-4">
        <button
          class="premium-icon-button"
          on:click={() => isSearchOpen = false}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <form 
          on:submit|preventDefault={handleSubmit}
          class="flex-1 relative"
        >
          <input
            type="text"
            placeholder="Search articles..."
            bind:value={searchValue}
            on:input={handleInput}
            class="premium-input pr-10"
            autofocus
          />
          {#if searchValue}
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 premium-icon-button !p-1"
              on:click={clearSearch}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          {/if}
        </form>
      </div>
    </div>
  </div>
{:else if !isMobile}
  <div class="flex items-center space-x-4">
    <div class="flex items-center space-x-2">
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
        on:click={() => dispatch('viewChange', viewMode === 'grid' ? 'list' : 'grid')}
        aria-label={viewMode === 'grid' ? "Switch to list view" : "Switch to grid view"}
      >
        {#if viewMode === 'grid'}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        {/if}
      </button>
    </div>

    <form 
      on:submit|preventDefault={handleSubmit}
      class="relative flex-1"
    >
      <input
        type="text"
        placeholder="Search articles..."
        bind:value={searchValue}
        on:input={handleInput}
        class="premium-input pl-11 pr-10"
      />
      <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      {#if searchValue}
        <button
          type="button"
          class="absolute right-3 top-1/2 -translate-y-1/2 premium-icon-button !p-1"
          on:click={clearSearch}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      {/if}
    </form>
  </div>
{/if}