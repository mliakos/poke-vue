<template>
  <div>
    <div class="row q-pa-md" v-if="pokemonData.species.flavor_text_entries">
      {{ generateDescription }}
    </div>
    <q-card class="q-mx-lg q-py-md">
      <div class="row q-pl-md q-mt-xs">
        <span class="col-4 text-grey-6">Type</span>
        <span class="col-8" v-if="pokemonData.type">{{
          this.pokemonData.type || "-"
        }}</span>
      </div>
      <div class="row q-pl-md q-mt-xs">
        <span class="col-4 text-grey-6">Height</span>
        <span class="col-8" v-if="pokemonData.height">{{
          this.pokemonData.height
        }}</span>
      </div>
      <div class="row q-pl-md q-mt-xs">
        <span class="col-4 text-grey-6">Weight</span>
        <span class="col-8" v-if="pokemonData.weight">{{
          this.pokemonData.weight
        }}</span>
      </div>
      <div class="row q-pl-md q-mt-xs">
        <span class="col-4 text-grey-6">Abilities</span>
        <span class="col-8" v-if="pokemonData.abilities">{{
          getAbilities
        }}</span>
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

  computed: {
    getAbilities() {
      return this.pokemonData.abilities
        .map(ability => capitalizeFirstLetter(ability.ability.name))
        .join(", ");
    },

    // Getting random description from array
    generateDescription() {
      const descriptionsArray = this.pokemonData.species.flavor_text_entries.filter(
        entry => entry.language.name === "en"
      );

      const index = Math.floor(Math.random() * descriptionsArray.length);

      return descriptionsArray[index].flavor_text;
    }
  }
};
</script>

<style scoped>
.label {
  color: #ccc;
}
</style>
