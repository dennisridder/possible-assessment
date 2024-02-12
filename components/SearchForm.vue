<template>
  <form class="flex justify-center items-center gap-4 p-4" @submit="onSubmit">
    <input
      ref="searchInput"
      v-model="searchString"
      name="name"
      type="text"
      class="p-4 rounded-md border-2 border-primary font-medium"
      placeholder="Search..."
    />
    <AppButton variant="secondary">Search</AppButton>
    <AppButton :to="{ query: {} }" variant="tertiary">Reset</AppButton>
  </form>
</template>

<script lang="ts" setup>
const router = useRouter();
const route = useRoute();

const searchInput = ref<HTMLInputElement>();
const searchString = ref(route.query.name || "");

const onSubmit = (event: Event) => {
  event.preventDefault();
  router.push({ query: { name: searchString.value } });
};
</script>
