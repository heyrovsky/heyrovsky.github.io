<script lang="ts">
  import { format } from 'date-fns';
  import Calendar from './Calendar.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let selectedDate = new Date();
  let isCalendarOpen = false;

  function toggleCalendar(event: MouseEvent) {
    event.stopPropagation();
    isCalendarOpen = !isCalendarOpen;
  }

  function handleSelect(event: CustomEvent<Date>) {
    selectedDate = event.detail;
    dispatch('select', selectedDate);
  }
</script>

<div class="relative flex items-center">
  <button
    class="premium-icon-button h-10 w-10 flex items-center justify-center"
    on:click={toggleCalendar}
    aria-label="Calendar"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  </button>

  <Calendar 
    bind:selectedDate
    bind:isOpen={isCalendarOpen}
    on:select={handleSelect}
  />
</div>