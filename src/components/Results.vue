<template>
  <div>
    <ul v-if="this.results">
      <Result v-for="result in this.results" :key="result.name">{{ result.name }}</Result>
    </ul>
  </div>
</template>

<script>
import Result from './Result';

export default {
  components: {
    Result
  },
  props: ['results'],
  name: 'Results'
};
</script>

<style scoped>
Input {
  border: none;
  border-bottom: 1px solid;
  width: 30%;
  margin: 0 auto;
  margin-top: 100px;
  outline: 0 none;
  display: block;
}
Input:focus {
  border-color: rgba(216, 181, 22, 0.842);
}
</style>
