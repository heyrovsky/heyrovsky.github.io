<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'outline' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
</script>

<button
  class="premium-button
  {size === 'sm' ? 'px-4 py-2 text-sm' : size === 'md' ? 'px-5 py-2.5' : 'px-6 py-3 text-lg'}
  {variant === 'primary' 
    ? 'bg-primary-600 text-white hover:bg-primary-700' 
    : variant === 'secondary'
    ? 'bg-surface-800 text-white hover:bg-surface-900'
    : 'border border-surface-200 hover:border-primary-300 hover:bg-primary-50 text-surface-700'}"
  on:click
>
  <slot />
</button>