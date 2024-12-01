<script lang="ts">
  export let viewMode: 'grid' | 'list';
</script>

<div class="premium-card overflow-hidden {viewMode === 'list' ? 'sm:flex' : ''} animate-pulse">
  <div class="relative {viewMode === 'list' ? 'sm:w-[280px]' : 'pb-[56.25%]'} bg-surface-100">
    <div class="absolute bottom-3 left-3 flex gap-1.5">
      <div class="h-6 w-16 bg-surface-200/80 backdrop-blur-sm rounded-lg"></div>
      <div class="h-6 w-20 bg-surface-200/80 backdrop-blur-sm rounded-lg"></div>
    </div>
  </div>

  <div class="flex-1 p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="flex flex-col gap-1.5">
        <div class="h-4 w-24 bg-surface-200 rounded"></div>
        <div class="h-3 w-32 bg-surface-200 rounded"></div>
      </div>
    </div>

    <div class="space-y-2 mb-3">
      <div class="h-6 w-3/4 bg-surface-200 rounded"></div>
      <div class="h-6 w-1/2 bg-surface-200 rounded"></div>
    </div>

    <div class="space-y-2 mb-6">
      <div class="h-4 w-full bg-surface-200 rounded"></div>
      <div class="h-4 w-2/3 bg-surface-200 rounded"></div>
    </div>

    <div class="flex items-center gap-2">
      <div class="h-5 w-5 bg-surface-200 rounded"></div>
      <div class="h-4 w-16 bg-surface-200 rounded"></div>
    </div>
  </div>
</div>