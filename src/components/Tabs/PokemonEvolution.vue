<template>
  <div v-if="pokemonData.evolutionChain">
    <h6 class="text-bold q-ma-md">Evolution Chain</h6>
    <q-card class="rounded-borders q-mx-lg">
      <div
        class="row items-center q-py-md"
        v-for="evolution in getEvolutionChain"
        :key="evolution.from.level"
      >
        <div class="col-5">
          <q-avatar @click="handleBadgeClick(evolution.from.name)"
            ><img
              :src="
                `https://cdn.traction.one/pokedex/pokemon/${evolution.from.id}.png`
              "
              alt="test"
          /></q-avatar>

          <div class="text-center">{{ evolution.from.name }}</div>
        </div>

        <div class="col-2">
          <span class="material-icons">
            arrow_forward
          </span>
          <div>Lvl {{ evolution.level }}</div>
        </div>

        <div class="col-5">
          <q-avatar @click="handleBadgeClick(evolution.to.name)"
            ><img
              :src="
                `https://cdn.traction.one/pokedex/pokemon/${evolution.to.id}.png`
              "
              alt="test"
          /></q-avatar>
          <div class="text-center">{{ evolution.to.name }}</div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import capitalizeFirstLetter from "../../utilities/capitalizeFirstLetter";

export default {
  name: "PokemonEvolution",
  props: {
    pokemonData: {
      type: Object,
      required: true
    }
  },
  computed: {
    /* FIXME: Find a solution to the API bug, where a non-first level pokemon's evolution chain starts from the begining
    (i.e. Charmeleon starts with Charmander in its evolution chain)
    */

    getEvolutionChain() {
      // Recursivelly extracting needed properties
      const traverse = (evolutionsArray, finalArray = []) => {
        // Iterate over current evolution's properties and populate final array
        evolutionsArray.forEach(evolution => {
          const [id] = evolution.species.url.match(/\/\d+\//g);
          finalArray.push({
            name: evolution.species.name,
            // FIXME: Handle situtations where evolution takes place over another trigger (use-item, stones, etc.)
            level: evolution.evolution_details[0].min_level,
            id: id.split("/")[1]
          });
          // Recursivelly run function again if there is another evolution
          if (evolution.evolves_to.length > 0) {
            traverse(evolution.evolves_to, finalArray);
          }
          return finalArray;
        });

        return finalArray;
      };

      // [{name: 'charmeleon', 'level': 15}]
      const extractedObjects = traverse(
        this.pokemonData.evolutionChain.chain.evolves_to
      );

      // Return final array
      return extractedObjects.map((evolutionObject, index) => {
        // On last element return (no more evolutions)
        if (index === extractedObjects.length) return;

        // First evolution only
        if (index === 0) {
          return {
            from: {
              name: capitalizeFirstLetter(this.pokemonData.name),
              id: this.pokemonData.id
            },
            to: {
              name: capitalizeFirstLetter(evolutionObject.name),
              id: evolutionObject.id
            },
            level: evolutionObject.level
          };
        }

        // Rest evolutions
        return {
          name: capitalizeFirstLetter(extractedObjects[index - 1].name),
          from: {
            name: capitalizeFirstLetter(extractedObjects[index - 1].name),
            id: extractedObjects[index - 1].id
          },
          to: {
            name: capitalizeFirstLetter(evolutionObject.name),
            id: evolutionObject.id
          },
          level: evolutionObject.level
        };
      });
    }
  },

  methods: {
    handleBadgeClick(pokemonName) {
      this.$router.push(`/pokedex/${pokemonName.toLowerCase()}`);
    }
  }
};
</script>

<style scoped>
img {
  width: 30%;
  display: inline;
}

div.q-avatar {
  background-color: lightgray;
}

[class*="col"] {
  text-align: center;
}
</style>
