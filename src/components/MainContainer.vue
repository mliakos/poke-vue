<template>
  <div>
    <!-- This could be outsourced into its own component
    but then we would need Vuex to share state with its sibling.
     -->
    <nav>
      <a
        v-for="(pokemonType, index) in pokemonTypes"
        :key="pokemonType"
        @click="handleClick(index)"
        :class="getClass(index)"
        >{{ pokemonType }}</a
      >
    </nav>

    <PokemonContainer :data="getTypeData" />
  </div>
</template>

<script>
import PokemonContainer from '../components/PokemonContainer';

export default {
  name: 'MainContainer',
  components: {
    PokemonContainer
  },
  data() {
    return {
      pokemonTypesData: [],
      pokemonTypes: [
        'ground',
        'water',
        'fire',
        'electric',
        'grass',
        'psychic',
        'rock'
      ],
      activeElementIndex: 0
    };
  },
  computed: {
    getTypeData() {
      const index = this.pokemonTypesData.findIndex(
        e => e.name === this.pokemonTypes[this.activeElementIndex]
      );

      return this.pokemonTypesData[index];
    }
  },
  methods: {
    fetchTypes(type) {
      fetch(`https://pokeapi.co/api/v2/type/${type}`)
        .then(res => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then(result => this.pokemonTypesData.push(result))
        .catch(e => console.log(e));
    },
    handleClick(index) {
      if (index !== this.activeElementIndex) {
        this.activeElementIndex = index;

        // Fetch type only if it has not been fetched yet
        if (
          !this.pokemonTypesData.find(e => e.name === this.pokemonTypes[index])
        ) {
          this.fetchTypes(this.pokemonTypes[index]);
        }
      }
    },
    getClass(index) {
      if (index === this.activeElementIndex) {
        return 'active';
      } else {
        return '';
      }
    }
  },

  mounted() {
    this.fetchTypes(this.pokemonTypes[0]);
  }
};
</script>

<style scoped>
nav a {
  margin: 5px;
  border-right: 1px solid;
  text-align: center;
  padding-right: 5px;
}

nav a:hover {
  cursor: pointer;
  background-color: burlywood;
}

nav a.active {
  background-color: rgb(196, 133, 51);
}

nav {
  border: 1px solid;
  border-radius: 2px;

  width: 50%;
  margin: 0 auto;
  overflow: hidden;
}
</style>
