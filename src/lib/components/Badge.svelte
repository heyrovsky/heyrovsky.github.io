<script lang="ts">
  export let text: string;
  export let variant: 'primary' | 'secondary' = 'primary';
</script>

<span class="inline-block px-3 py-1 text-xs font-medium rounded-lg transition-colors max-w-[120px] truncate {
  variant === 'primary' 
    ? 'bg-primary-100/50 text-primary-700' 
    : 'bg-surface-100 text-surface-700'
}">
  {text}
</span>

<style>
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>