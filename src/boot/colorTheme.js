import { cardNames, typeNames } from "../config/names";
import Vue from "vue";

Vue.prototype.$colorTheme = {
  [cardNames.POKEDEX]: "green-12",
  [cardNames.MOVES]: "red-11",
  [cardNames.ABILITIES]: "blue-4",
  [cardNames.ITEMS]: "amber-4",
  [cardNames.LOCATIONS]: "deep-purple-5",
  [cardNames.TYPECHARTS]: "brown-6",

  types: {
    [typeNames.NORMAL]: "A8A77A",
    [typeNames.FIRE]: "EE8130",
    [typeNames.WATER]: "6390F0",
    [typeNames.ELECTRIC]: "F7D02C",
    [typeNames.GRASS]: "7AC74C",
    [typeNames.ICE]: "96D9D6",
    [typeNames.FIGHTING]: "C22E28",
    [typeNames.POISON]: "A33EA1",
    [typeNames.GROUND]: "E2BF65",
    [typeNames.FLYING]: "A98FF3",
    [typeNames.PSYCHIC]: "F95587",
    [typeNames.BUG]: "A6B91A",
    [typeNames.ROCK]: "B6A136",
    [typeNames.GHOST]: "735797",
    [typeNames.DRAGON]: "6F35FC",
    [typeNames.DARK]: "705746",
    [typeNames.STEEL]: "B7B7CE",
    [typeNames.FAIRY]: "D685AD"
  }
};
