import type { Character } from "./characters";

export interface EpisodesState {
  isLoading: boolean;
  episodes: Episode[];
  totalPages: number;
  filters: EpisodeFilters;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Character[];
  created: string;
}

export interface EpisodeFilters {
  page: number;
  name?: string;
}

export const useEpisodesStore = defineStore("episodes", {
  state: (): EpisodesState => {
    const route = useRoute();
    const page = Number(route.query.page) || 1;

    return {
      isLoading: false,
      episodes: [],
      totalPages: 0,
      filters: {
        page,
      },
    };
  },
  getters: {
    currentPage: (state) => state.filters.page || 1,
  },
  actions: {
    setEpisodes(episodes: Episode[]) {
      this.episodes = episodes;
    },
    setCurrentPage(page: number) {
      this.filters = { ...this.filters, page };
    },
    setFilters(filters: EpisodeFilters) {
      this.filters = {
        name: filters.name || undefined,
        page: Number(filters.page) || 1,
      };
    },
    setTotalPages(totalPages: number) {
      this.totalPages = totalPages;
    },
    async fetch() {
      const query = gql`
        query getEpisodes($page: Int!, $name: String = "") {
          episodes(page: $page, filter: { name: $name }) {
            info {
              count
              pages
              next
              prev
            }
            results {
              id
              name
              air_date
              episode
              characters {
                id
                name
                status
                species
                type
              }
              created
            }
          }
        }
      `;
      this.isLoading = true;
      const { data } = await useAsyncQuery(query, this.filters);

      this.isLoading = false;
      this.setTotalPages(data.value?.episodes.info.pages ?? 0);
      this.setEpisodes(data.value?.episodes.results ?? []);
    },
    async fetchById(id: number) {
      const query = gql`
        query getEpisode($id: ID!) {
          episode(id: $id) {
            id
            name
            air_date
            episode
            characters {
              id
              name
              status
              species
              type
            }
            created
          }
        }
      `;
      this.isLoading = true;
      const { data } = await useAsyncQuery(query, { id });
      this.isLoading = false;

      return data.value?.episode ?? {};
    },
  },
});
