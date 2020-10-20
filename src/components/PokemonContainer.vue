<template>
  <div class="row justify-center">
    <q-card
      v-for="pokemon in pokemonData"
      :key="pokemon.name"
      :class="`mainCard text-bold col-4`"
      @click="handleClick(pokemon.name)"
    >
      <q-card-section>
        <img
          :src="getPokemonNumber(pokemon.url)"
          :alt="pokemon.name + ' image'"
        />
        {{ pokemon.name }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "PokemonContainer",
  data() {
    return {
      pokemonData: [],
      totalPokemon: 0,
      nextPage: "",
      loading: false
    };
  },

  methods: {
    async fetchAllPokemon() {
      this.loading = true;

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);

      const parsedResponse =
        response.status == 200 ? await response.json() : null;

      this.loading = false;

      return parsedResponse;
    },

    getPokemonNumber(url) {
      const [match] = url.match(/(\/)(\d+)(\/)/g);

      const [, pokemonNumber] = match.split("/");

      return `https://cdn.traction.one/pokedex/pokemon/${pokemonNumber}.png`;
    },

    handleClick(pokemonName) {
      this.$router.push(`/pokedex/${pokemonName.toLowerCase()}/about`);
    }
  },

  async created() {
    const pokemonData = await this.fetchAllPokemon();

    // Updating state
    this.totalPokemon = pokemonData.count;
    this.pokemonData.push(...pokemonData.results);
  }
};
</script>

<style scoped>
.mainCard {
  margin: 5px;
  transition: all 0.2s ease-in-out;
  border-radius: 20px;
}

.mainCard:hover {
  margin: 5px;
  transform: scale(1.05);
  cursor: pointer;
}

img {
  width: 50%;
}
</style>
