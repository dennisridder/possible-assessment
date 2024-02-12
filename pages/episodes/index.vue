<template>
  <div class="p-4">
    <h1 class="text-primary text-3xl lg:text-5xl leading-snug font-bold">
      Episodes
    </h1>

    <p v-if="isLoading" class="p-4">Loading...</p>

    <SearchForm />

    <div
      v-if="episodes"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))] gap-4 mb-8"
    >
      <AppCard
        v-for="episode in episodes"
        :key="episode.id"
        :link="`/episodes/${episode.id}`"
        :title="episode.name"
      >
        <p>{{ episode.episode }}</p>
        <p>{{ episode.air_date }}</p>

        <nav
          v-if="episode.characters.length"
          class="pt-2 text-xs flex gap-1 flex-wrap"
        >
          <NuxtLink
            v-for="character in episode.characters.slice(0, 3)"
            :key="character.id"
            :to="`/characters/${character.id}`"
            class="text-primary underline hover:opacity-90"
          >
            {{ character.name }}
          </NuxtLink>
          <span v-if="episode.characters.length > 3">... and more</span>
        </nav>
      </AppCard>
    </div>

    <p
      v-if="!isLoading && episodes?.length === 0"
      class="p-4 font-medium text-center"
    >
      No episodes found.
    </p>

    <div class="sticky bottom-0 inset-x-0 bg-white bg-opacity-90">
      <AppPagination :current-page="currentPage" :total-pages="totalPages" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { EpisodeFilters } from "@/store/episodes";
import { useEpisodesStore } from "@/store/episodes";

const store = useEpisodesStore();
const route = useRoute();

const { isLoading, episodes, currentPage, totalPages } = storeToRefs(store);

watch(
  () => route.query,
  () => {
    store.setFilters(route.query as unknown as EpisodeFilters);
    store.fetch();
  },
);

store.fetch();
</script>
