<template>
  <div class="p-4">
    <h1 class="text-primary text-3xl lg:text-5xl leading-snug font-bold mb-4">
      Character: {{ character?.name }}
    </h1>

    <p v-if="isLoading" class="p-4">Loading...</p>

    <AppCard
      v-if="character"
      :link="`/characters/${character.id}`"
      :title="character.name"
      :image="character.image"
      class="mb-8"
    >
      <p>Status: {{ character.status }}</p>
      <p>Species: {{ character.species }}</p>
      <p>Type: {{ character.type }}</p>
      <p>Gender: {{ character.gender }}</p>
      <p>Origin: {{ character.origin?.name }}</p>
      <p>Location: {{ character.location?.name }}</p>
      <p>
        Episodes:
        <span class="inline-flex flex-col gap-1 text-xs flex-wrap">
          <NuxtLink
            v-for="episode in character.episode"
            :key="episode.id"
            :to="`/episodes/${episode.id}`"
            class="text-primary underline"
            >{{ episode.name }} - {{ episode.episode }}</NuxtLink
          >
        </span>
      </p>
    </AppCard>

    <AppButton to="/characters">Back to overview</AppButton>
  </div>
</template>

<script lang="ts" setup>
import type { Character } from "@/store/characters";
import { useCharactersStore } from "@/store/characters";

const store = useCharactersStore();
const route = useRoute();
const character = ref<Character | null>(null);

const { isLoading } = storeToRefs(store);

store
  .fetchById(Number(route.params.id))
  .then((result: Character) => (character.value = result))
  .catch((error) => console.error(error));
</script>
