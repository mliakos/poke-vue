<template>
  <div class="bg-purple">
    {{ $route.params.pokemonName }}
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
      <q-card-section>
        <router-view></router-view>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "PokemonDetails",
  data() {
    return {
      activeLink: "About",
      links: ["About", "Base Stats", "Evolution", "Moves"]
    };
  },
  methods: {
    fetchPokemonData() {},

    isActive(text) {
      if (text === this.activeLink) return "active";
    },

    handleLinkClick(link) {
      if (link !== this.activeLink) {
        this.activeLink = link;

        this.$router.push(
          `${this.$router.history.current.fullPath}/${this.parsedActiveLink}`
        );
      }
    }
  },

  computed: {
    // Necessary processing to use for routing
    parsedActiveLink() {
      return this.activeLink
        .toLowerCase()
        .split(" ")
        .join("");
    }
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
