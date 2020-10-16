<template>
  <div>
    <div class="card" @click="handleClick">
      <slot> </slot>
    </div>
    <PokemonDetails
      :pokemonData="pokemonData[0]"
      v-if="this.pokemonData.length"
      v-show="isVisible"
    />
  </div>
</template>

<script>
import PokemonDetails from './PokemonDetails';

export default {
  name: 'Pokemon',
  data() {
    return {
      pokemonData: [],
      isVisible: false
    };
  },
  props: {
    pokemonURL: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick() {
      // Fetch if data array is empty and div is not visible
      if (!this.pokemonData.length && !this.isVisible) {
        fetch(this.pokemonURL)
          .then(res => {
            if (res.status == 200) {
              return res.json();
            }
          })
          .then(result => {
            this.pokemonData.push(result);
            this.isVisible = true;
          })
          .catch(e => console.log(e));
      } else {
        this.isVisible = !this.isVisible;
      }
    }
  },
  components: {
    PokemonDetails
  }
};
</script>

<style scoped>
div.card {
  border: 1px solid;
  border-radius: 2px;
  width: 50%;
  margin: 0 auto;
  margin-bottom: 5px;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 0px 4px rgba(47, 63, 63, 0.733);
}

.card:hover {
  transform: scale(1.1);
  cursor: pointer;
}
</style>
