import type { Episode } from "./episodes";

export interface CharactersState {
  isLoading: boolean;
  characters: Character[];
  totalPages: number;
  filters: CharacterFilters;
}

export interface Character {
  id: string;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: {
    id: number;
    name: string;
  };
  location: {
    id: number;
    name: string;
  };
  image: string;
  episode: Episode[];
  created: string;
}

export interface CharacterFilters {
  page: number;
  name?: string;
  status?: "Alive" | "Dead" | "unknown";
  species?: string;
  type?: string;
}

export const useCharactersStore = defineStore("characters", {
  state: (): CharactersState => {
    const route = useRoute();
    const page = Number(route.query.page) || 1;

    return {
      isLoading: false,
      characters: [],
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
    setCharacters(characters: Character[]) {
      this.characters = characters;
    },
    setCurrentPage(page: number) {
      this.filters = { ...this.filters, page };
    },
    setFilters(filters: CharacterFilters) {
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
        query getCharacters($page: Int!, $name: String = "") {
          characters(page: $page, filter: { name: $name }) {
            info {
              count
              pages
              next
              prev
            }
            results {
              id
              name
              status
              species
              type
              gender
              origin {
                name
              }
              location {
                name
              }
              image
              episode {
                id
                name
                episode
                air_date
                created
              }
              created
            }
          }
        }
      `;
      this.isLoading = true;
      const { data } = await useAsyncQuery(query, this.filters);

      this.isLoading = false;
      this.setTotalPages(data.value?.characters.info.pages ?? 0);
      this.setCharacters(data.value?.characters.results ?? []);
    },
    async fetchById(id: number) {
      const query = gql`
        query getCharacter($id: ID!) {
          character(id: $id) {
            id
            name
            status
            species
            type
            gender
            origin {
              name
            }
            location {
              name
            }
            image
            episode {
              id
              name
              episode
              air_date
              created
            }
            created
          }
        }
      `;
      this.isLoading = true;
      const { data } = await useAsyncQuery(query, { id });
      this.isLoading = false;

      return data.value?.character ?? {};
    },
  },
});
