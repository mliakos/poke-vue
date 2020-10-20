<template>
  <div class="column">
    {{ $route.params.pokemonName }}
    <img src="" alt="" />

    <q-card :class="`mainCard text-bold self-end`">
      <q-card-section>
        test
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "Pokemon",
  data() {
    return {
      pokemonData: []
    };
  },
  methods: {
    fetchPokemonData() {}
  },

  created() {}
};
</script>

<style scoped>
.mainCard {
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: beige;
}
</style>
