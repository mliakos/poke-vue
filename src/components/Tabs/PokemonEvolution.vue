<template>
  <div>
    <h6 class="text-bold">Evolution Chain</h6>
    <q-card class="rounded-borders q-mx-lg"
      ><img
        :src="
          `https://cdn.traction.one/pokedex/pokemon/${pokemonData.chain.id}.png`
        "
        alt="test"
        v-for="evolution in pokemonData.chain.chain['evolves_to']"
      />
      <span class="material-icons">
        arrow_forward
      </span>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "PokemonEvolution",
  props: {
    pokemonData: {
      type: Object,
      required: true
    }
  }
};

//TODO: Finish 'Evolution' tab
//TODO: Complete 'Moves' Tab
</script>

<style scoped>
img {
  width: 20%;
  display: inline;
}
</style>
