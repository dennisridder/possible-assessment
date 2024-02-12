<template>
  <div
    class="max-w-[300px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <NuxtLink v-if="props.image" :to="props.link">
      <img class="rounded-t-lg" :src="props.image" alt="" />
    </NuxtLink>
    <div class="p-5">
      <NuxtLink :to="props.link">
        <h3
          class="mb-2 text-base font-medium tracking-tight text-gray-900 dark:text-white"
          v-text="props.title"
        ></h3>
      </NuxtLink>
      <p
        v-if="props.description"
        class="mb-3 font-normal text-gray-700 dark:text-gray-400"
        v-text="props.description"
      />
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string;
  image?: string;
  description?: string;
  link?: string;
}>();
</script>
