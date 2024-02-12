<template>
  <div class="min-h-screen flex flex-col justify-center p-4">
    <h1 class="text-primary text-6xl font-bold leading-snug text-center">
      {{ config.name }}
    </h1>
    <p class="text-lg font-medium text-center mb-8">{{ config.description }}</p>

    <div class="flex justify-center items-center gap-4 p-4">
      <AppButton to="/characters">Characters</AppButton>
      <AppButton to="/locations" variant="secondary">Locations</AppButton>
      <AppButton to="/episodes" variant="tertiary">Episodes</AppButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { config } = useAppConfig();
definePageMeta({
  layout: "blank",
});
</script>
