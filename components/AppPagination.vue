<template>
  <div class="flex flex-wrap justify-center items-center gap-4 p-4">
    <NuxtLink
      :to="{ query: { ...$route.query, page: previousPageNumber } }"
      :class="[
        'bg-secondary text-white py-4 px-8 min-w-[100px] rounded-md font-bold text-center hover:bg-opacity-90',
      ]"
      :aria-disabled="currentPage <= 1"
      @click="onChangePage ? onChangePage(previousPageNumber) : null"
    >
      Previous
    </NuxtLink>
    <NuxtLink
      v-for="pageNumber in pages"
      :key="pageNumber"
      :to="{ query: { ...$route.query, page: pageNumber } }"
      :class="[
        currentPage === pageNumber ? 'bg-primary' : 'bg-secondary',
        'text-white py-4 px-8 min-w-[100px] rounded-md font-bold text-center hover:bg-opacity-90',
      ]"
      @click="onChangePage ? onChangePage(pageNumber) : null"
    >
      {{ pageNumber }}
    </NuxtLink>

    <NuxtLink
      as="button"
      :to="{ query: { ...$route.query, page: nextPageNumber } }"
      :class="[
        'bg-secondary text-white py-4 px-8 min-w-[100px] rounded-md font-bold text-center hover:bg-opacity-90',
      ]"
      :aria-disabled="currentPage >= totalPages"
      @click="onChangePage ? onChangePage(nextPageNumber) : null"
    >
      Next
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  currentPage: number;
  totalPages: number;
  onChangePage?: (page: number) => any;
}>();
const pages = computed(() => {
  let numShown = 5;
  numShown = Math.min(numShown, props.totalPages);
  let first = props.currentPage - Math.floor(numShown / 2);
  first = Math.max(first, 1);
  first = Math.min(first, props.totalPages - numShown + 1);
  return [...Array(numShown)].map((k, i) => i + first);
});
const previousPageNumber = computed(() => props.currentPage - 1);
const nextPageNumber = computed(() => props.currentPage + 1);
</script>

<style lang="css">
a[aria-disabled="true"] {
  @apply cursor-not-allowed pointer-events-none opacity-20;
}
</style>
