<template>
  <div class="">
    <div class="row q-pa-md">
      {{ this.pokemonData.description }}
    </div>
    <q-card class="q-mx-lg q-py-md">
      <div class="row q-pl-md q-mt-xs">
        <span class="col-4 text-grey-6">Type</span>
        <span class="col-8">{{ this.pokemonData.type || "-" }}</span>
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
      </div>
    </q-card>
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

  // IMPORTANT: If this is used as a computed property it throws (Cannot read property 'map' of undefined")
  methods: {
    getAbilities() {
      return this.pokemonData.abilities
        .map(ability => capitalizeFirstLetter(ability.ability.name))
        .join(", ");
    }
  }
};
</script>

<style scoped>
.label {
  color: #ccc;
}
</style>
