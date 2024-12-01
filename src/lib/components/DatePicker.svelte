<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import DatePicker from 'date-picker-svelte';

  const dispatch = createEventDispatcher<{
    select: Date;
  }>();

  let selected: Date = new Date();
  let showPicker = false;
  let buttonRef: HTMLButtonElement;

  function handleSelect(event: CustomEvent<Date>) {
    selected = event.detail;
    showPicker = false;
    dispatch('select', selected);
  }

  function togglePicker() {
    showPicker = !showPicker;
  }

  // Close picker when clicking outside
  function handleClickOutside(event: MouseEvent) {
    if (showPicker && buttonRef && !buttonRef.contains(event.target as Node)) {
      showPicker = false;
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="relative">
  <button
    bind:this={buttonRef}
    on:click|stopPropagation={togglePicker}
    class="inline-flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <span class="text-sm text-slate-700 hidden md:inline">
      {selected.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
    </span>
  </button>

  {#if showPicker}
    <div class="absolute top-full left-0 mt-2 z-50">
      <DatePicker
        bind:selected
        on:select={handleSelect}
        closeOnSelection={true}
      />
    </div>
  {/if}
</div>

<style>
  :global(.date-picker) {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
</style>