import type { Character } from "./characters";

export interface LocationsState {
  isLoading: boolean;
  locations: Location[];
  totalPages: number;
  filters: LocationFilters;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Character[];
  created: string;
}

export interface LocationFilters {
  page: number;
  name?: string;
}

export const useLocationsStore = defineStore("locations", {
  state: (): LocationsState => {
    const route = useRoute();
    const page = Number(route.query.page) || 1;

    return {
      isLoading: false,
      locations: [],
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
    setLocations(locations: Location[]) {
      this.locations = locations;
    },
    setCurrentPage(page: number) {
      this.filters = { ...this.filters, page };
    },
    setFilters(filters: LocationFilters) {
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
        query getLocations($page: Int!, $name: String = "") {
          locations(page: $page, filter: { name: $name }) {
            info {
              count
              pages
              next
              prev
            }
            results {
              id
              name
              type
              dimension
              residents {
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
      this.setTotalPages(data.value?.locations.info.pages ?? 0);
      this.setLocations(data.value?.locations.results ?? []);
    },
    async fetchById(id: number) {
      const query = gql`
        query getLocation($id: ID!) {
          location(id: $id) {
            id
            name
            type
            dimension
            residents {
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

      return data.value?.location ?? {};
    },
  },
});
