<template>
  <div class="p-4">
    <h1 class="text-primary text-3xl lg:text-5xl leading-snug font-bold mb-4">
      Episode: {{ episode?.name }} - {{ episode?.episode }}
    </h1>

    <p v-if="isLoading" class="p-4">Loading...</p>

    <AppCard
      v-if="episode"
      :link="`/episodes/${episode.id}`"
      :title="episode.name"
      class="mb-8"
    >
      <p>{{ episode.episode }}</p>
      <p>{{ episode.air_date }}</p>

      <nav class="pt-2 text-xs flex gap-1 flex-wrap">
        <NuxtLink
          v-for="character in episode.characters"
          :key="character.id"
          :to="`/characters/${character.id}`"
          class="text-primary underline hover:opacity-90"
        >
          {{ character.name }}
        </NuxtLink>
      </nav>
    </AppCard>

    <AppButton to="/episodes">Back to overview</AppButton>
  </div>
</template>

<script lang="ts" setup>
import type { Episode } from "@/store/episodes";
import { useEpisodesStore } from "@/store/episodes";

const store = useEpisodesStore();
const route = useRoute();
const episode = ref<Episode | null>(null);

const { isLoading } = storeToRefs(store);

store
  .fetchById(Number(route.params.id))
  .then((result: Episode) => (episode.value = result))
  .catch((error: any) => console.error(error));
</script>
