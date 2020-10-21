<template>
  <div>
    <section class="q-ml-md">
      <q-icon
        class="q-my-lg"
        name="keyboard_backspace"
        size="2rem"
        @click="handleIconClick"
      />

      <h4 class="text-bold q-ma-xs ">
        {{ capitalizeFirstLetter(pokemonData.name) }}
      </h4>
      <q-chip :key="type" v-for="type in getTypes">{{ type }}</q-chip>
    </section>
    <PokemonDetails :pokemonData="pokemonData" />
  </div>
</template>

<script>
// Utility imports
import capitalizeFirstLetter from "../utilities/capitalizeFirstLetter";

import PokemonDetails from "../components/PokemonDetails";

export default {
  name: "Pokemon",
  components: {
    PokemonDetails
  },
  data() {
    return {
      pokemonData: {}
    };
  },

  computed: {
    // Extracting types and capitalizing first letter
    getTypes() {
      return this.pokemonData.types.map(type =>
        capitalizeFirstLetter(type.type.name)
      );
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

    handleIconClick() {
      this.$router.go(-1);
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
  },
  beforeRouteUpdate() {
    // Emitting first type in order to change background color accordingly
    // $event.emit([getTypes()]);
  }
};
</script>

<style scoped></style>
