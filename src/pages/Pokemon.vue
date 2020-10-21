<template>
  <PokemonDetails :pokemonData="pokemonData" />
</template>

<script>
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
    }
  },
  async created() {
    const pokemonData = await this.fetchPokemonData(
      this.$route.params.pokemonName
    );

    this.pokemonData = pokemonData;
  }
};
</script>

<style scoped></style>
