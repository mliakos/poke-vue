<template>
  <div class="row justify-center">
    <q-card
      v-for="card in mainCards"
      :key="card"
      :class="`mainCard text-white text-bold bg-${getClass(card)}`"
      @click="handleClick(card)"
    >
      <q-card-section>
        {{ card }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { cardNames } from "../config/names";

export default {
  name: "MainCategories",

  data() {
    return {
      mainCards: Object.values(cardNames)
    };
  },
  methods: {
    getClass(card) {
      let { [card]: color } = this.$colorTheme;

      return color;
    },

    handleClick(card) {
      this.$router.push(card.toLowerCase()).catch(e => console.log(e));
    }
  }
};
</script>

<style scoped>
.mainCard {
  border-radius: 15px;
  width: 40%;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
  background-image: url("../assets/pokeball.svg");
  transition: all 0.2s ease-in-out;
}

.mainCard:hover {
  cursor: pointer;
  opacity: 80%;
  transform: scale(1.05);
}
</style>
