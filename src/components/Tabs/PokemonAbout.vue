<template>
  <div>
    {{ this.pokemonData.description }}
  </div>
</template>

<script>
export default {
  name: "PokemonAbout",
  props: {
    pokemonData: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>
