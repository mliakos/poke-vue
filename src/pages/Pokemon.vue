<template>
  <div>
    <section class="q-mx-md row">
      <q-icon
        class="q-mt-lg col-1 text-white"
        name="keyboard_backspace"
        size="2rem"
        @click="goBack"
      />
      <q-space class="col-10" />
      <q-icon
        class="q-mt-lg col-1 text-white"
        :name="getFavoriteIcon"
        size="2rem"
        @click="toggleFavorite"
      />
    </section>

    <section class="row q-ml-md">
      <h4 class="col-10 text-bold q-ma-xs text-white">
        {{ capitalizeFirstLetter(pokemonData.name) }}
      </h4>
    </section>
    <section class="row q-mx-md">
      <q-chip
        class="text-white text-bold q-ma-xs"
        :key="type"
        v-for="type in getTypes"
        >{{ type }}</q-chip
      >
      <q-space />
      <span class="col-1 text-bold q-ma-xs text-white text-subtitle1">
        {{ getPokemonId }}
      </span>
    </section>

    <PokemonDetails :pokemonData="pokemonData" />
  </div>
</template>

<script>
// Utility imports
import capitalizeFirstLetter from "../utilities/capitalizeFirstLetter";
import EventBus from "../utilities/EventBus";

import PokemonDetails from "../components/PokemonDetails";

export default {
  name: "Pokemon",
  components: {
    PokemonDetails
  },
  data() {
    return {
      pokemonData: {},
      isFavorite: false
    };
  },

  computed: {
    // Extracting types and capitalizing first letter
    getTypes() {
      // FIXME: this.pokemonData.types undefined, USE NAVIGATION GUARDS
      return this.pokemonData.types.map(type => {
        return capitalizeFirstLetter(type.type.name);
      });
    },

    getFavoriteIcon() {
      if (this.isFavorite) {
        return "favorite";
      }
      return "favorite_border";
    },

    getPokemonId() {
      const id = this.pokemonData.id;

      if (id < 10) {
        return `#00${id}`;
      } else if (id >= 10 && id < 100) {
        return `#0${id}`;
      }

      return `#${id}`;
    }
  },

  methods: {
    async fetchEvolutionChain(id) {
      this.loading = true;

      const response = await fetch(
        `https://pokeapi.co/api/v2/evolution-chain/${id}`
      );

      let parsedResponse;

      try {
        parsedResponse = response.status == 200 ? await response.json() : null;
      } catch (e) {
        console.log(response);
      }

      this.loading = false;

      return parsedResponse;
    },

    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
    },

    goBack() {
      this.$router.replace(`/pokedex`);
    },

    capitalizeFirstLetter(string) {
      return capitalizeFirstLetter(string);
    }
  },

  async mounted() {
    // Getting pokemon type
    const [mainType] = this.getTypes;

    // Globally emitting type
    EventBus.$emit("POKEMON_SELECT", mainType);

    const evolutionChain = await this.fetchEvolutionChain(this.pokemonData.id);

    this.$set(this.pokemonData, "chain", evolutionChain);
  },

  async beforeRouteEnter(to, from, next) {
    const pokemonData = await (async pokemonName => {
      // Fetching main data
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );

      //TODO: Fetch description, species property and evolution chain URL from 'pokemon-species' endpoint

      const parsedResponse =
        response.status == 200 ? await response.json() : null;

      return parsedResponse;
    })(to.params.pokemonName);

    next(vm => {
      vm.pokemonData = pokemonData;
    });
  }
};

// TODO: Ability to save favorites in local storage/IndexedDB
// TODO: Use navigation guards before loading route and show loading state
</script>

<style scoped>
div.q-chip {
  background: rgba(255, 255, 255, 0.2);
}
</style>
