<template>
  <div class="">
    <div class="row q-pa-md">
      <div class="text-h5 text-bold">Description</div>
      {{ this.pokemonData.description }}
    </div>
    <div class="row q-pl-md q-mt-xs">
      <span class="col-4">Type</span>
      <span class="col-8">{{ this.pokemonData.type }}</span>
    </div>
    <div class="row q-pl-md q-mt-xs">
      <span class="col-4">Height</span>
      <span class="col-8">{{ this.pokemonData.height }}</span>
    </div>
    <div class="row q-pl-md q-mt-xs">
      <span class="col-4">Weight</span>
      <span class="col-8">{{ this.pokemonData.weight }}</span>
    </div>
    <div class="row q-pl-md q-mt-xs">
      <span class="col-4">Abilities</span>
      <span class="col-8">{{ getAbilities }}</span>
    </div>
  </div>
</template>

<script>
import capitalizeFirstLetter from "src/utilities/capitalizeFirstLetter";
export default {
  name: "PokemonAbout",
  props: {
    pokemonData: {
      type: Object,
      required: true
    }
  },
  computed: {
    getAbilities() {
      return this.pokemonData.abilities
        .map(ability => capitalizeFirstLetter(ability.ability.name))
        .join(", ");
    }
  }
};
</script>

<style scoped></style>
