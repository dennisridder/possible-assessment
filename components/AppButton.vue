<template>
  <component
    :is="componentType"
    :to="to"
    class="inline-block text-white py-4 px-8 min-w-[100px] rounded-md font-bold text-center hover:bg-opacity-90"
    :class="[props.expanded ? 'w-full' : null, bgColor]"
  >
    <slot>Button</slot>
  </component>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";

const props = defineProps<{
  to?: RouteLocationRaw | undefined;
  variant?: "primary" | "secondary" | "tertiary";
  expanded?: boolean;
}>();

const componentType = computed(() => {
  if (props.to) return resolveComponent("NuxtLink");
  return "button";
});

const variantsMapper = {
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
};

const bgColor = ref(
  props.variant ? variantsMapper[props.variant] : "bg-primary",
);
</script>
