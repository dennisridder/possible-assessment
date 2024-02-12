export interface NuxtAppConfig {
  name?: string;
  description?: string;
}

declare module "@nuxt/schema" {
  interface AppConfigInput {
    config?: NuxtAppConfig;
  }
}

export default defineAppConfig({
  config: {
    name: "Rick & Morty",
    description:
      "Showcasing Vue/Nuxt 3 + TypeScript + Tailwind + Pinia + Apollo Client (GraphQL)",
  } as NuxtAppConfig,
});
