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
      <q-card-section>
        <router-view>test</router-view>
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

  computed: {
    // Necessary processing to use for routing
    parsedActiveLink() {
      return this.activeLink
        .toLowerCase()
        .split(" ")
        .join("");
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
