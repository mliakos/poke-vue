import Vue from "vue";
import Vuex from "vuex";

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      pokemonData: [],
      nextPage: "https://pokeapi.co/api/v2/pokemon",
      selectedPokemon: {
        type: "",
        name: "",
        id: null
      },
      loading: false
    },
    getters: {
      pokemonId(state) {
        return;
      }
    },
    mutations: {
      UPDATE_POKEMON_DATA(state, data) {
        state.pokemonData = [...state.pokemonData, ...data];
      },

      SET_NEXT_PAGE(state, nextPage) {
        state.nextPage = nextPage;
      },

      SET_LOADING_STATE(state, value) {
        state.loading = value;
      },

      SET_SELECTED_POKEMON(state, pokemonObject) {
        state.selectedPokemon = pokemonObject;
      }
    },
    actions: {
      async fetchAllPokemon(context, url) {
        context.commit("SET_LOADING_STATE", true);

        const response = await fetch(url);

        let parsedResponse;

        try {
          parsedResponse =
            response.status == 200 ? await response.json() : null;
        } catch (e) {
          console.log(response);
          context.commit("SET_LOADING_STATE", false);
        }

        // Committing mutations

        context.commit("SET_NEXT_PAGE", parsedResponse.next);

        context.commit("UPDATE_POKEMON_DATA", parsedResponse.results);
        context.commit("SET_LOADING_STATE", false);
      },

      setSelectedPokemon(context, pokemonObject) {
        context.commit("SET_SELECTED_POKEMON", pokemonObject);
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
