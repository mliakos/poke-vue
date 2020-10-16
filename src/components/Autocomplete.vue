<template>
  <div>
    <Input @input="searchHandler($event)" /> <Results :results="this.results" />
  </div>
</template>

<script>
import Input from './Input';
import Results from './Results';

import { debounce } from 'vue-debounce';

export default {
  components: {
    Input,
    Results
  },
  name: 'Autocomplete',
  data() {
    return {
      inputData: '',
      loading: false,
      results: []
    };
  },
  methods: {
    // Executed when triggering a search
    searchHandler(searchQuery) {
      this.loading = true;
      fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery}/`)
        .then(response => response.json())
        .then(data => {
          this.loading = true;
          this.results.push(data);
        })
        .catch(e => console.log(e));
    }
  },
  // Debouncing search method
  created() {
    this.searchHandler = debounce(this.searchHandler, 500);
  }
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
