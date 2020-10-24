<template>
  <div>
    <q-card :class="`mainCard text-bold self-end fixed-bottom`">
      <img
        :src="`https://cdn.traction.one/pokedex/pokemon/${pokemonData.id}.png`"
        :alt="pokemonData.name + ' image'"
        class="relative-position"
      />
      <q-card-section class="row justify-between">
        <span
          :class="`col-auto link q-pa-sm ${isActive(link)}`"
          :key="link"
          v-for="link in links"
          @click="handleLinkClick(link)"
          >{{ link }}</span
        >
      </q-card-section>

      <!-- Dynamic tab component rendering -->
      <component
        :pokemonData="generateTabData"
        :is="this.$tabComponents[activeLink].name"
        class="q-mb-lg"
      />
    </q-card>
  </div>
</template>

<script>
// Config imports
import { tabNames } from "../config/names";

// Component imports
import PokemonAbout from "../components/Tabs/PokemonAbout";
import PokemonStats from "../components/Tabs/PokemonStats";
import PokemonEvolution from "../components/Tabs/PokemonEvolution";
import PokemonMoves from "../components/Tabs/PokemonMoves";

export default {
  name: "PokemonDetails",
  props: {
    pokemonData: {
      type: Object,
      required: true
    }
  },
  components: {
    PokemonAbout,
    PokemonStats,
    PokemonEvolution,
    PokemonMoves
  },
  data() {
    return {
      activeLink: "About",
      links: Object.values(tabNames)
    };
  },

  computed: {
    // Necessary processing to use for routing
    parsedActiveLink() {
      return this.activeLink
        .toLowerCase()
        .split(" ")
        .join("");
    },

    // Dynamically generate data to pass to dynamic component tab
    generateTabData() {
      const data = this.pokemonData;
      const tabComponentObject = this.$tabComponents[this.activeLink];

      // Creating object with relevant data extracted from main data object using config file
      return tabComponentObject.data.reduce((acc, current) => {
        // Dynamically accessing and assigning API response properties to returned object
        acc[current] = data[current];

        return acc;
      }, {});
    }
  },

  methods: {
    isActive(text) {
      return text === this.activeLink ? "active" : "text-grey-5";
    },

    handleLinkClick(link) {
      if (link !== this.activeLink) {
        this.activeLink = link;

        this.$router.push(this.parsedActiveLink);
      }
    },

    // Setting active link on explicit route load
    setActiveLink() {
      const extractedLink = this.$route.params.activeLink;

      //Setting active link based on tabNames config
      this.activeLink = tabNames[extractedLink.toUpperCase()];
    }
  },
  created() {
    this.setActiveLink();
  }
};
</script>

<style scoped>
.mainCard {
  width: 100%;
  height: 55%;
  background-color: white;
  border-radius: 35px 35px 0 0;
}

.link:hover {
  cursor: pointer;
}

.link.active {
  border-bottom: 2px solid blue;
  color: black;
}

img {
  width: 50%;
  position: relative;
  top: -160px;
  margin: 0 auto;
  margin-bottom: -170px;
  z-index: 99;
}
</style>
