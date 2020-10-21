<template>
  <div class="q-ml-md">
    <q-icon
      class="q-my-lg"
      name="keyboard_backspace"
      size="2rem"
      @click="handleIconClick"
    />
    <div class="row justify-center">
      <q-card
        v-for="pokemon in pokemonData"
        :key="pokemon.name"
        :class="`mainCard text-bold col-5`"
        @click="handlePokemonClick(pokemon.name)"
      >
        <q-card-section class="row justify-center">
          {{ capitalizeFirstLetter(pokemon.name) }}
        </q-card-section>

        <q-card-section class="row justify-center">
          <img
            :src="getPokemonNumber(pokemon.url)"
            :alt="pokemon.name + ' image'"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import EventBus from "../utilities/EventBus";
import capitalizeFirstLetter from "src/utilities/capitalizeFirstLetter";

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

    handlePokemonClick(pokemonName) {
      this.$router.push(`/pokedex/${pokemonName.toLowerCase()}`);
    },

    handleIconClick() {
      this.$router.replace("/");
    },

    capitalizeFirstLetter(string) {
      // FIXME: It accepts an undefined string and throws (UI doesn't crash)
      return capitalizeFirstLetter(string);
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
  width: 70%;
}
</style>
