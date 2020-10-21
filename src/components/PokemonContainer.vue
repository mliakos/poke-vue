<template>
  <div class="q-ml-md">
    <q-icon
      class="q-my-lg"
      name="keyboard_backspace"
      size="2rem"
      @click="handleIconClick"
    />
    <q-infinite-scroll
      class="row justify-center"
      @load="infiniteLoad"
      :offset="250"
    >
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

      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
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
      nextPage: "https://pokeapi.co/api/v2/pokemon",
      loading: false
    };
  },

  methods: {
    async fetchAllPokemon(url, done = null) {
      this.loading = true;

      const response = await fetch(url);

      let parsedResponse;

      try {
        parsedResponse = response.status == 200 ? await response.json() : null;
      } catch (e) {
        console.log(response);
      }

      this.loading = false;

      // Updating state
      this.totalPokemon = parsedResponse.count;
      this.nextPage = parsedResponse.next;
      this.pokemonData.push(...parsedResponse.results);

      if (done) done();
    },

    async infiniteLoad(index, done) {
      //NOTE: This function runs automatically on some lifecycle hook (created, mounted, etc.). No need to re-run.
      await this.fetchAllPokemon(this.nextPage);
      done();
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
