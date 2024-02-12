<template>
  <div class="h-screen flex flex-col">
    <div
      class="h-[64px] max-h-[64px] bg-primary text-white p-4 leading-tight font-medium flex flex-wrap justify-between items-center gap-4"
    >
      <NuxtLink to="/" class="font-bold">{{ config.name }}</NuxtLink>
      <nav class="flex flex-wrap justify-between items-center gap-4">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="hover:underline"
          :class="{
            'font-bold': $route.path === link.to,
            'opacity-80': $route.path === link.to,
          }"
        >
          {{ link.name }}
        </NuxtLink>
      </nav>
    </div>
    <slot />
    <footer
      class="h-[36px] md:h-[48px] bg-slate-100 text-right p-4 pb-8 mt-auto"
    >
      Copyright © {{ new Date().getFullYear() }}
    </footer>
  </div>
</template>

<script lang="ts" setup>
const { config } = useAppConfig();
const links = [
  { to: "/characters", name: "Characters" },
  { to: "/locations", name: "Locations" },
  { to: "/episodes", name: "Episodes" },
];
</script>
