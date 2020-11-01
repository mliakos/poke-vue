<template>
  <div class="q-ml-md" v-if="pokemonData">
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
        :class="`mainCard q-ma-sm text-bold col-5`"
        @click="handlePokemonClick(pokemon.name)"
        data-testid="pokemonCard"
      >
        <q-card-section class="row justify-center">
          {{ capitalizeFirstLetter(pokemon.name) }}
        </q-card-section>

        <q-card-section class="row justify-center">
          <img :src="imageSource(pokemon.url)" :alt="pokemon.name + ' image'" />
        </q-card-section>
      </q-card>

      <template v-slot:loading>
        <q-spinner-dots
          class="col-5 justify-center"
          color="primary"
          :size="getSpinnerSize"
        />
      </template>
    </q-infinite-scroll>
  </div>
</template>

<script>
import EventBus from "../utilities/EventBus";
import capitalizeFirstLetter from "src/utilities/capitalizeFirstLetter";
import { mapState, mapActions } from "vuex";

export default {
  name: "PokemonContainer",

  computed: {
    getSpinnerSize() {
      return window.innerWidth / 5;
    },

    ...mapState(["pokemonData", "nextPage", "loading"])
  },

  methods: {
    ...mapActions(["fetchAllPokemon"]),

    //NOTE: This function runs automatically on some lifecycle hook (created, mounted, etc.). No need to re-run.
    async infiniteLoad(index, done) {
      // Next pokemon fetch cycle
      await this.fetchAllPokemon(this.nextPage);

      done();
    },

    imageSource(url) {
      const [match] = url.match(/(\/)(\d+)(\/)/g);

      const [, pokemonNumber] = match.split("/");

      return `https://cdn.traction.one/pokedex/pokemon/${pokemonNumber}.png`;
    },

    handlePokemonClick(pokemonName) {
      // Saving scrolling coordinates
      this.$route.meta.yCoordinates = window.pageYOffset;

      this.$router.push(`/pokedex/${pokemonName.toLowerCase()}`);
    },

    handleIconClick() {
      this.$router.replace("/");
    },

    capitalizeFirstLetter(string) {
      return capitalizeFirstLetter(string);
    }
  },
  updated() {
    // Return to the same scrolling position
    // FIXME: Find alternative method for saving scrolling position
    // window.scroll(0, this.$route.meta.yCoordinates);
  }
};
</script>

<style scoped>
.mainCard {
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
