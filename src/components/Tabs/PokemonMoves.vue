<template>
  <div>
    <q-card class="q-ma-lg q-py-xs">
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        class="q-ma-md"
        style="height: 200px; max-width: 300px;"
      >
        <div
          :key="move.move.name"
          v-for="move in pokemonData.moves"
          class="q-px-md q-py-xs text-center move"
        >
          <div>{{ capitalizeFirstLetter(move.move.name) }}</div>
          <div class="text-grey-5">
            Level: {{ move.version_group_details[0].level_learned_at }}
          </div>
        </div>
      </q-scroll-area>
    </q-card>
  </div>
</template>

<script>
import capitalizeFirstLetter from "../../utilities/capitalizeFirstLetter";

export default {
  name: "PokemonMoves",
  props: {
    pokemonData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0
      }
    };
  },
  methods: {
    capitalizeFirstLetter(value) {
      return capitalizeFirstLetter(value);
    }
  }
};
</script>

<style scoped>
.move {
  border-bottom: 1px solid lightgray;
}
</style>
