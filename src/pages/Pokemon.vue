<template>
  <PokemonDetails />
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
      pokemonData: []
    };
  },
  methods: {
    async fetchPokemonData(pokemonName) {
      this.loading = true;

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );

      const parsedResponse =
        response.status == 200 ? await response.json() : null;
      this.loading = false;

      return parsedResponse;
    }
  },
  created() {
    this.fetchPokemonData(this.$route.params.pokemonName);
  }
};
</script>

<style scoped></style>
