<template>
  <div :data="data.pokemon" class="results" v-if="data">
    <Pokemon
      v-for="pokemon in data.pokemon"
      :pokemonURL="pokemon.pokemon.url"
      :key="pokemon.pokemon.name"
      >{{ pokemon.pokemon.name }}</Pokemon
    >
  </div>
</template>

<script>
import Pokemon from './Pokemon';

export default {
  components: {
    Pokemon
  },
  data() {
    return {
      pokemonData: []
    };
  },
  props: ['data'],

  name: 'PokemonContainer'
};
</script>

<style scoped>
.results {
  margin-top: 10px;
}
</style>
