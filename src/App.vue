<template>
  <div id="q-app" class="quicksand">
    <router-view :style="`background-color: #${backgroundColor}`" />
  </div>
</template>
<script>
import { typeNames } from "./config/names";

import EventBus from "./utilities/EventBus";

export default {
  name: "App",
  data() {
    return {
      selectedPokemonType: ""
    };
  },
  computed: {
    // Dynamically change route background color
    backgroundColor() {
      // Using currently selected pokemon type to dynamically extract color from config
      let { [this.selectedPokemonType]: color } = this.$colorTheme.types;

      return color || "fff";
    }
  },

  created() {
    EventBus.$on("POKEMON_SELECT", type => {
      this.selectedPokemonType = type;
    });
  }
};
</script>

<style scoped></style>
