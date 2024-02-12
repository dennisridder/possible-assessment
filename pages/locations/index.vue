<template>
  <div class="p-4">
    <h1 class="text-primary text-3xl lg:text-5xl leading-snug font-bold">
      Locations
    </h1>

    <p v-if="isLoading" class="p-4">Loading...</p>

    <SearchForm />

    <div
      v-if="locations"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))] gap-4 mb-8"
    >
      <AppCard
        v-for="location in locations"
        :key="location.id"
        :link="`/locations/${location.id}`"
        :title="location.name"
      >
        <p>{{ location.type }}</p>
        <p>{{ location.dimension }}</p>

        <nav
          v-if="location.residents.length"
          class="pt-2 text-xs flex gap-1 flex-wrap"
        >
          <NuxtLink
            v-for="character in location.residents.slice(0, 3)"
            :key="character.id"
            :to="`/characters/${character.id}`"
            class="text-primary underline hover:opacity-90"
          >
            {{ character.name }}
          </NuxtLink>
          <span v-if="location.residents.length > 3">... and more</span>
        </nav>
      </AppCard>
    </div>

    <p
      v-if="!isLoading && locations?.length === 0"
      class="p-4 font-medium text-center"
    >
      No locations found.
    </p>

    <div class="sticky bottom-0 inset-x-0 bg-white bg-opacity-90">
      <AppPagination :current-page="currentPage" :total-pages="totalPages" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LocationFilters } from "@/store/locations";
import { useLocationsStore } from "@/store/locations";

const store = useLocationsStore();
const route = useRoute();

const { isLoading, locations, currentPage, totalPages } = storeToRefs(store);

watch(
  () => route.query,
  () => {
    store.setFilters(route.query as unknown as LocationFilters);
    store.fetch();
  },
);

store.fetch();
</script>
