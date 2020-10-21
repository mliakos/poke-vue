/*
Used for dynamic component rendering in pokemon profile tabs
*/

import { tabNames } from "../config/names";
import Vue from "vue";

Vue.prototype.$tabComponents = {
  [tabNames.ABOUT]: {
    // Component-to-be-rendered name
    name: "PokemonAbout",

    // Specifying API response properties to display in tab
    data: ["description", "weight", "height", "types", "abilities"]
  },
  [tabNames.BASESTATS]: {
    // Component-to-be-rendered name
    name: "PokemonStats",

    // Specifying API response properties to display in tab
    data: ["description", "weight", "height", "types", "abilities"]
  },
  [tabNames.EVOLUTION]: {
    // Component-to-be-rendered name
    name: "PokemonEvolution",

    // Specifying API response properties to display in tab
    data: ["description", "weight", "height", "types", "abilities"]
  },
  [tabNames.MOVES]: {
    // Component-to-be-rendered name
    name: "PokemonMoves",

    // Specifying API response properties to display in tab
    data: ["description", "weight", "height", "types", "abilities"]
  }
};

// {
//     description:
//       'This would work if the second API would be kind enough to send me a "Access-Control-Allow-Origin: *" header :)',
//     weight: data.weight,
//     height: data.height,
//     types: data.types,
//     abilities: data.abilities
//   }
