<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isAfter, startOfToday } from 'date-fns';

  export let selectedDate: Date = startOfToday();
  export let isOpen = false;

  const dispatch = createEventDispatcher();
  let currentMonth = selectedDate;
  const today = startOfToday();

  $: monthDays = getMonthDays(currentMonth);
  $: weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  $: canGoNext = !isAfter(startOfMonth(addMonths(currentMonth, 1)), today);
  $: isMobile = window.innerWidth < 768;

  function getMonthDays(date: Date) {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end });
  }

  function nextMonth() {
    if (canGoNext) {
      currentMonth = addMonths(currentMonth, 1);
    }
  }

  function prevMonth() {
    currentMonth = subMonths(currentMonth, 1);
  }

  function selectDate(date: Date) {
    if (!isAfter(date, today)) {
      selectedDate = date;
      dispatch('select', date);
      isOpen = false;
    }
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.calendar-container')) {
      isOpen = false;
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="calendar-container relative inline-block">
  {#if isOpen}
    {#if isMobile}
      <div class="fixed inset-0 bg-white/80 backdrop-blur-md z-50">
        <div class="p-4">
          <div class="flex items-center space-x-4 mb-6">
            <button
              class="premium-icon-button"
              on:click={() => isOpen = false}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 class="text-lg font-medium text-surface-900">Select Date</h2>
          </div>

          <div class="premium-card p-4 w-full max-w-[320px] mx-auto">
            <div class="flex items-center justify-between mb-4">
              <button class="premium-icon-button" on:click={prevMonth}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 class="text-surface-900 font-medium">
                {format(currentMonth, 'MMMM yyyy')}
              </h2>
              <button 
                class="premium-icon-button disabled:opacity-50" 
                on:click={nextMonth}
                disabled={!canGoNext}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div class="grid grid-cols-7 gap-1 mb-2">
              {#each weekDays as day}
                <div class="h-8 flex items-center justify-center text-xs font-medium text-surface-500">
                  {day}
                </div>
              {/each}
            </div>

            <div class="grid grid-cols-7 gap-1">
              {#each Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() }, (_, i) => i) as _}
                <div class="h-8"></div>
              {/each}
              
              {#each monthDays as day}
                {@const isDisabled = isAfter(day, today)}
                <button
                  class="h-8 w-8 rounded-lg flex items-center justify-center text-sm transition-colors
                  {isSameDay(day, selectedDate) 
                    ? 'bg-primary-600 text-white' 
                    : isSameMonth(day, currentMonth)
                      ? isDisabled
                        ? 'text-surface-300 cursor-not-allowed'
                        : 'text-surface-900 hover:bg-primary-50'
                      : 'text-surface-400'}"
                  on:click={() => selectDate(day)}
                  disabled={isDisabled}
                >
                  {format(day, 'd')}
                </button>
              {/each}
            </div>
          </div>
        </div>
      </div>
    {:else}
      <div class="absolute top-full left-0 mt-2 premium-card p-4 min-w-[320px] z-50">
        <div class="flex items-center justify-between mb-4">
          <button class="premium-icon-button" on:click={prevMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 class="text-surface-900 font-medium">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <button 
            class="premium-icon-button disabled:opacity-50" 
            on:click={nextMonth}
            disabled={!canGoNext}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-7 gap-1 mb-2">
          {#each weekDays as day}
            <div class="h-8 flex items-center justify-center text-xs font-medium text-surface-500">
              {day}
            </div>
          {/each}
        </div>

        <div class="grid grid-cols-7 gap-1">
          {#each Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() }, (_, i) => i) as _}
            <div class="h-8"></div>
          {/each}
          
          {#each monthDays as day}
            {@const isDisabled = isAfter(day, today)}
            <button
              class="h-8 w-8 rounded-lg flex items-center justify-center text-sm transition-colors
              {isSameDay(day, selectedDate) 
                ? 'bg-primary-600 text-white' 
                : isSameMonth(day, currentMonth)
                  ? isDisabled
                    ? 'text-surface-300 cursor-not-allowed'
                    : 'text-surface-900 hover:bg-primary-50'
                  : 'text-surface-400'}"
              on:click={() => selectDate(day)}
              disabled={isDisabled}
            >
              {format(day, 'd')}
            </button>
          {/each}
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slide-in-from-bottom {
    from { transform: translateY(1rem); }
    to { transform: translateY(0); }
  }

  .animate-in {
    animation: fade-in 0.2s ease-out, slide-in-from-bottom 0.2s ease-out;
  }
</style>