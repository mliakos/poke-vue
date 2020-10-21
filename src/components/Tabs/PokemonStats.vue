<template>
  <div class="">
    <div class="row q-pl-md q-mt-xs">
      <span class="col-4 text-grey-6">HP</span>
      <span class="col-1">{{ getStat("hp") }} </span>
      <div class="col-5 q-pa-sm q-gutter-md">
        <q-linear-progress
          size="sm"
          :value="getStat('hp') / 150"
          color="primary"
        />
      </div>
    </div>
    <div class="row q-pl-md q-mt-xs">
      <span class="col-4 text-grey-6">Attack</span>
      <span class="col-1">{{ getStat("attack") }} </span>
      <div class="col-5 q-pa-sm q-gutter-md">
        <q-linear-progress
          size="sm"
          :value="getStat('attack') / 150"
          color="primary"
        />
      </div>
    </div>
    <div class="row q-pl-md q-mt-xs">
      <span class="col-4 text-grey-6">Defense</span>
      <span class="col-1">{{ getStat("defense") }}</span>
      <div class="col-5 q-pa-sm q-gutter-md">
        <q-linear-progress
          size="sm"
          :value="getStat('defense') / 150"
          color="primary"
        />
      </div>
    </div>
    <div class="row q-pl-md q-mt-xs">
      <span class="col-4 text-grey-6">Sp. Attack</span>
      <span class="col-1">{{ getStat("special-attack") }}</span>
      <div class="col-5 q-pa-sm q-gutter-md">
        <q-linear-progress
          size="sm"
          :value="getStat('special-attack') / 150"
          color="primary"
        />
      </div>
    </div>
    <div class="row q-pl-md q-mt-xs">
      <span class="col-4 text-grey-6">Sp. Defense</span>
      <span class="col-1">{{ getStat("special-defense") }}</span>
      <div class="col-5 q-pa-sm q-gutter-md">
        <q-linear-progress
          size="sm"
          :value="getStat('special-defense') / 150"
          color="primary"
        />
      </div>
    </div>
    <div class="row q-pl-md q-mt-xs">
      <span class="col-4 text-grey-6">Speed</span>
      <span class="col-1">{{ getStat("speed") }}</span>
      <div class="col-5 q-pa-sm q-gutter-md">
        <q-linear-progress
          size="sm"
          :value="getStat('speed') / 150"
          color="primary"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonStats",
  props: {
    pokemonData: {
      type: Object,
      required: true
    }
  },
  methods: {
    getStat(name) {
      return this.pokemonData.stats.find(stat => stat.stat.name === name)
        ?.base_stat;
    }
  }
};
</script>

<style scoped></style>
