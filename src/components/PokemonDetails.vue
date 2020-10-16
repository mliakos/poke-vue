<template>
  <article class="card">
    <img :src="pokemonData.sprites.front_default" />
    <div>{{ pokemonData.name }}</div>
    <div>Attack: {{ getStat('attack') }}</div>
    <div>Defense: {{ getStat('defense') }}</div>
    <div>HP: {{ getStat('hp') }}</div>
  </article>
</template>

<script>
export default {
  name: 'PokemonDetails',

  props: {
    pokemonData: {
      type: Object,
      required: true
    }
  },
  methods: {
    getStat(stat) {
      const index = this.pokemonData.stats.findIndex(
        el => el.stat.name === stat
      );
      return this.pokemonData.stats[index].base_stat;
    }
  }
};
</script>

<style scoped>
article.card {
  border: 1px solid;
  border-radius: 2px;
  width: 50%;
  margin: 0 auto;
  margin-bottom: 5px;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 0px 4px rgba(47, 63, 63, 0.733);
}
</style>
