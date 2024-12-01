<script lang="ts">
  export let currentPage = 1;
  export let totalPages = 1;
  export let isLoading = false;
</script>

<div class="flex items-center justify-center gap-2">
  <!-- First page -->
  <button
    class="premium-icon-button"
    disabled={currentPage === 1 || isLoading}
    on:click={() => currentPage = 1}
    aria-label="Go to first page"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
    </svg>
  </button>

  <!-- Previous page -->
  <button
    class="premium-icon-button"
    disabled={currentPage === 1 || isLoading}
    on:click={() => currentPage--}
    aria-label="Previous page"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
  </button>
  
  <!-- Current page -->
  <div class="flex items-center gap-2 min-w-[100px] justify-center">
    <span class="w-10 h-10 flex items-center justify-center rounded-xl font-medium
      {isLoading ? 'bg-surface-200' : 'bg-primary-600'} text-white transition-colors">
      {currentPage}
    </span>
    <span class="text-surface-600">of</span>
    <span class="text-surface-900 font-medium">{totalPages}</span>
  </div>
  
  <!-- Next page -->
  <button
    class="premium-icon-button"
    disabled={currentPage === totalPages || isLoading}
    on:click={() => currentPage++}
    aria-label="Next page"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  </button>

  <!-- Last page -->
  <button
    class="premium-icon-button"
    disabled={currentPage === totalPages || isLoading}
    on:click={() => currentPage = totalPages}
    aria-label="Go to last page"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    </svg>
  </button>
</div>