<template>
  <div class="results" v-if="data">
    <Result
      :data="data.pokemon"
      v-for="pokemon in data.pokemon"
      :key="pokemon.pokemon.name"
      >{{ pokemon.pokemon.name }}</Result
    >
  </div>
</template>

<script>
import Result from './Result';

export default {
  components: {
    Result
  },
  props: ['data'],
  name: 'Results',
  methods: {
    test() {
      console.log(this.data.pokemon);
    }
  }
};
</script>

<style scoped>
.results {
  margin-top: 10px;
}
</style>
