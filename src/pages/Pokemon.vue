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

    <section class="q-ml-md">
      <h4 class="text-bold q-ma-xs text-white">
        {{ capitalizeFirstLetter(pokemonData.name) }}
      </h4>
      <q-chip
        class="text-white text-bold"
        :key="type"
        v-for="type in getTypes"
        >{{ type }}</q-chip
      >
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
      return this.pokemonData.types.map(type =>
        capitalizeFirstLetter(type.type.name)
      );
    },

    getFavoriteIcon() {
      if (this.isFavorite) {
        return "favorite";
      }
      return "favorite_border";
    }
  },

  methods: {
    async fetchPokemonData(pokemonName) {
      this.loading = true;

      // Fetching main data
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );

      const parsedResponse =
        response.status == 200 ? await response.json() : null;

      this.loading = false;

      return parsedResponse;
    },

    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
    },

    goBack() {
      this.$router.replace("/pokedex");
    },

    capitalizeFirstLetter(string) {
      // FIXME: It accepts an undefined string and throws (UI doesn't crash)
      return capitalizeFirstLetter(string);
    }
  },
  async created() {
    const pokemonData = await this.fetchPokemonData(
      this.$route.params.pokemonName
    );

    this.pokemonData = pokemonData;

    const [mainType] = this.getTypes;

    EventBus.$emit("POKEMON_SELECT", mainType);
  }
};
</script>

<style scoped>
div.q-chip {
  background: rgba(255, 255, 255, 0.2);
}
</style>
