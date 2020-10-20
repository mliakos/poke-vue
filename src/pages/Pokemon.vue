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
  }
};
</script>

<style scoped></style>
