<template>
  <div class="bg-purple">
    {{ this.$route.params.pokemonName }}
    <img src="" alt="" />

    <q-card :class="`mainCard text-bold self-end`">
      <q-card-section class="row justify-evenly">
        <span
          :class="`link q-pa-sm ${isActive(link)}`"
          :key="link"
          v-for="link in links"
          @click="handleLinkClick(link)"
          >{{ link }}</span
        >
      </q-card-section>
      <component
        :pokemonData="generateAboutData"
        :is="this.$tabComponents[activeLink].name"
      />
      <q-card-section>
        <router-view>test</router-view>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { tabNames } from "../config/names";

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
    generateAboutData() {
      const data = this.pokemonData;
      const tabComponentObject = this.$tabComponents[this.activeLink];

      // Creating object with relevant data from config file
      return tabComponentObject.data.reduce((acc, current) => {
        // Handling description CORS API bug by providing a static one
        if (current == "description") {
          acc[current] =
            'This would work if the second API would be kind enough to send me a "Access-Control-Allow-Origin: *" header :)';
          return acc;
        }

        // Dynamically accessing and assigning API response properties to returned object
        acc[current] = data[current];
        return acc;
      }, {});
    }
  },

  methods: {
    isActive(text) {
      if (text === this.activeLink) return "active";
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

      // Capitalizing first letter
      const link =
        extractedLink.charAt(0).toUpperCase() + extractedLink.slice(1);

      if (extractedLink === "basestats") {
        this.activeLink = "Base Stats";
      } else {
        //Setting active link
        this.activeLink = link;
      }
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
  position: absolute;
  bottom: 0;
  background-color: blue;
  border-radius: 28px 28px 0 0;
}

.link:hover {
  cursor: pointer;
}

.link.active {
  border-bottom: 1px solid bisque;
}
</style>
