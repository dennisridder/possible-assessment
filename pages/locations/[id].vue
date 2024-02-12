<template>
  <div class="p-4">
    <h1 class="text-primary text-3xl lg:text-5xl leading-snug font-bold mb-4">
      Location: {{ location?.name }}
    </h1>

    <p v-if="isLoading" class="p-4">Loading...</p>

    <AppCard
      v-if="location"
      :link="`/locations/${location.id}`"
      :title="location.name"
      class="mb-8"
    >
      <p>Type: {{ location.type }}</p>
      <p>Dimension: {{ location.dimension }}</p>

      <nav class="pt-2 text-xs flex gap-1 flex-wrap">
        <NuxtLink
          v-for="character in location.residents"
          :key="character.id"
          :to="`/characters/${character.id}`"
          class="text-primary underline hover:opacity-90"
        >
          {{ character.name }}
        </NuxtLink>
      </nav>
    </AppCard>

    <AppButton to="/locations">Back to overview</AppButton>
  </div>
</template>

<script lang="ts" setup>
import type { Location } from "@/store/locations";
import { useLocationsStore } from "@/store/locations";

const store = useLocationsStore();
const route = useRoute();
const location = ref<Location | null>(null);

const { isLoading } = storeToRefs(store);

store
  .fetchById(Number(route.params.id))
  .then((result: Location) => (location.value = result))
  .catch((error: any) => console.error(error));
</script>
