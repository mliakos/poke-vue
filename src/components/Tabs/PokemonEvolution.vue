<template>
  <div>
    <h6 class="text-bold">Evolution Chain</h6>
    <q-card class="rounded-borders q-mx-lg"
      ><img
        :src="
          `https://cdn.traction.one/pokedex/pokemon/${pokemonData.evolutionChain.id}.png`
        "
        alt="test"
        v-for="evolution in pokemonData.evolutionChain"
      />
      <span class="material-icons">
        arrow_forward
      </span>
      {{ getEvolutionChain }}
    </q-card>
  </div>
</template>

<script>
export default {
  name: "PokemonEvolution",
  props: {
    pokemonData: {
      type: Object,
      required: true
    }
  },
  computed: {
    getEvolutionChain() {
      const arr = [];
      const traverse = (evolutionsArray, finalArray = []) => {
        // // Iterate over current evolution's properties and populate final array
        // evolutionsArray.forEach(evolution => {
        //   finalArray.push({
        //     name: evolution.species.name,
        //     level: evolution.evolution_details[0].min_level
        //   });
        //   // Recursivelly run function again if there is another evolution
        //   if (evolution.evolves_to.length > 0) {
        //     traverse(evolution.evolves_to, finalArray);
        //   }
        //   return finalArray;
        // });

        return evolutionsArray[0].species.name;
      };

      return traverse(this.pokemonData.evolutionChain.chain.evolves_to);
    }
  }
};

//TODO: Finish 'Evolution' tab
//TODO: Complete 'Moves' Tab
</script>

<style scoped>
img {
  width: 30%;
  display: inline;
}
</style>
