<template>
  <div class="p-4">
    <h1 class="text-primary text-3xl lg:text-5xl leading-snug font-bold">
      Characters
    </h1>

    <p v-if="isLoading" class="p-4">Loading...</p>

    <SearchForm />

    <div
      v-if="characters"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))] gap-4 mb-8"
    >
      <AppCard
        v-for="character in characters"
        :key="character.id"
        :link="`/characters/${character.id}`"
        :title="character.name"
        :image="character.image"
      />
    </div>

    <p
      v-if="!isLoading && characters?.length === 0"
      class="p-4 font-medium text-center"
    >
      No characters found.
    </p>

    <div class="sticky bottom-0 inset-x-0 bg-white bg-opacity-90">
      <AppPagination :current-page="currentPage" :total-pages="totalPages" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CharacterFilters } from "@/store/characters";
import { useCharactersStore } from "@/store/characters";

const store = useCharactersStore();
const route = useRoute();

const { isLoading, characters, currentPage, totalPages } = storeToRefs(store);

watch(
  () => route.query,
  () => {
    store.setFilters(route.query as unknown as CharacterFilters);
    store.fetch();
  },
);

store.fetch();
</script>
