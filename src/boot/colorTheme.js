import { cardNames } from "../config/cardNames";
import Vue from "vue";

Vue.prototype.$colorTheme = {
  [cardNames.POKEDEX]: "green-12",
  [cardNames.MOVES]: "red-11",
  [cardNames.ABILITIES]: "blue-4",
  [cardNames.ITEMS]: "amber-4",
  [cardNames.LOCATIONS]: "deep-purple-5",
  [cardNames.TYPECHARTS]: "brown-6"
};
