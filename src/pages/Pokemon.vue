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
    async fetchPokemonData() {
      this.loading = true;
      const pokemonName = this.$route.params.pokemonName;

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );

      const parsedResponse =
        response.status == 200 ? await response.json() : null;

      this.loading = false;

      return parsedResponse;
    }
  },
  created() {}
};
</script>

<style scoped></style>
