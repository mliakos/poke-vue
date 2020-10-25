<template>
  <div>
    <section class="q-mx-md row">
      <q-icon
        class="q-mt-lg col-1 text-white"
        name="keyboard_backspace"
        size="2rem"
        @click="goBack"
      />
      <q-space class="col-10" />
      <q-icon
        class="q-mt-lg col-1 text-white"
        :name="getFavoriteIcon"
        size="2rem"
        @click="toggleFavorite"
      />
    </section>

    <section class="row q-ml-md">
      <h4 class="col-10 text-bold q-ma-xs text-white">
        {{ capitalizeFirstLetter(pokemonData.name) }}
      </h4>
    </section>
    <section class="row q-mx-md">
      <q-chip
        class="text-white text-bold q-ma-xs"
        :key="type"
        v-for="type in getTypes"
        >{{ type }}</q-chip
      >
      <q-space />
      <span class="col-1 text-bold q-ma-xs text-white text-subtitle1">
        {{ getPokemonId }}
      </span>
    </section>

    <PokemonDetails :pokemonData="pokemonData" />
  </div>
</template>

<script>
// Utility imports
import capitalizeFirstLetter from "../utilities/capitalizeFirstLetter";
import EventBus from "../utilities/EventBus";

import PokemonDetails from "../components/PokemonDetails";

export default {
  name: "Pokemon",
  components: {
    PokemonDetails
  },
  data() {
    return {
      //NOTE: The object's structure needs to be defined beforehand, because it is used in computed properties and thus Vue accesses data before rendering.
      pokemonData: {
        types: [],
        stats: [],
        name: "",
        abilities: [],
        moves: [],
        species: {},
        evolutionChain: {
          chain: {
            evolves_to: []
          }
        }
      },
      isFavorite: false
    };
  },

  computed: {
    // Extracting types and capitalizing first letter
    getTypes() {
      return this.pokemonData.types.map(type => {
        return capitalizeFirstLetter(type.type.name);
      });
    },

    getFavoriteIcon() {
      if (this.isFavorite) {
        return "favorite";
      }
      return "favorite_border";
    },

    getPokemonId() {
      const id = this.pokemonData.id;

      if (id < 10) {
        return `#00${id}`;
      } else if (id >= 10 && id < 100) {
        return `#0${id}`;
      }

      return `#${id}`;
    }
  },

  methods: {
    async initializeComponent(pokemonName) {
      // Fetching main data
      const pokemonData = await this.fetchData(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );

      this.pokemonData = pokemonData;

      // Getting pokemon type
      const [mainType] = this.getTypes;

      // Globally emitting type (mainly for background selection)
      EventBus.$emit("POKEMON_SELECT", mainType);

      // Fetching species data (additional data)
      const pokemonSpeciesData = await this.fetchData(
        `https://pokeapi.co/api/v2/pokemon-species/${this.pokemonData.id}`
      );

      // this.pokemonData.species = pokemonSpeciesData;
      this.$set(this.pokemonData, "species", pokemonSpeciesData);

      // Fetching evolution chain data
      const evolutionChain = await this.fetchData(
        this.pokemonData.species.evolution_chain.url
      );

      /*
    // NOTE: If evolutionChain is set using normal assignment (this.pokemonData instead of $set) then it is passed down from PokemonDetails
    //  down to PokemonEvolution as undefined.
    */

      // this.pokemonData.evolutionChain = evolutionChain;
      this.$set(this.pokemonData, "evolutionChain", evolutionChain);

      // Toggling favorite
      this.isFavorite = JSON.parse(
        localStorage.getItem(this.pokemonData.id)
      )?.isFavorite;
    },

    async fetchData(url) {
      this.loading = true;

      // Fetching main data
      const response = await fetch(url);

      const parsedResponse =
        response.status == 200 ? await response.json() : null;

      this.loading = false;

      return parsedResponse;
    },

    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      localStorage.setItem(
        this.pokemonData.id,
        JSON.stringify({ isFavorite: this.isFavorite })
      );
    },

    goBack() {
      this.$router.replace(`/pokedex`);
    },

    capitalizeFirstLetter(value) {
      return capitalizeFirstLetter(value);
    }
  },

  async mounted() {
    this.initializeComponent(this.$route.params.pokemonName);

    // Load pokemon by listening to child event (evolution)
    EventBus.$on("LOAD_POKEMON", async pokemonName => {
      this.initializeComponent(pokemonName);
    });
  }
};

// TODO: Show skeleton after navigating to route
</script>

<style scoped>
div.q-chip {
  background: rgba(255, 255, 255, 0.2);
}
</style>
