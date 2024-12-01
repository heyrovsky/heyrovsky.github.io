<script lang="ts">
  export let items: { label: string; href: string }[];
</script>

<nav class="flex" aria-label="Breadcrumb">
  <ol class="inline-flex items-center space-x-1 md:space-x-3">
    {#each items as item, i}
      <li class="inline-flex items-center">
        {#if i > 0}
          <svg class="w-3 h-3 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>
        {/if}
        <a href={item.href} class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary">
          {item.label}
        </a>
      </li>
    {/each}
  </ol>
</nav>