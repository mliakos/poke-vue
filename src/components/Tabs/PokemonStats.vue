<template>
  <div class="">
    <!-- <div class="row q-pa-md">
      {{ this.pokemonData.description }}
    </div>
    <div class="row q-pl-md q-mt-xs">
      <span class="col-4 text-grey-6">Type</span>
      <span class="col-8">{{ this.pokemonData.type }}</span>
    </div>
    <div class="row q-pl-md q-mt-xs">
      <span class="col-4 text-grey-6">Height</span>
      <span class="col-8">{{ this.pokemonData.height }}</span>
    </div>
    <div class="row q-pl-md q-mt-xs">
      <span class="col-4 text-grey-6">Weight</span>
      <span class="col-8">{{ this.pokemonData.weight }}</span>
    </div>
    <div class="row q-pl-md q-mt-xs">
      <span class="col-4 text-grey-6">Abilities</span>
      <span class="col-8">{{ getAbilities }}</span>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "PokemonStats",
  props: {
    pokemonData: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>
