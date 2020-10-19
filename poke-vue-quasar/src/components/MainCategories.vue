<template>
  <div class="row justify-center">
    <q-card
      v-for="item in mainItems"
      :key="item.title"
      :class="`mainCard bg-${item.color}`"
    >
      <q-card-section>
        {{ item.title }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "MainCategories",
  data() {
    return {
      mainItems: [
        {
          title: "Pokedex",
          color: "purple-3"
        },
        {
          title: "Moves",
          color: "purple-3"
        },
        {
          title: "Abilities",
          color: "purple-3"
        },
        {
          title: "Items",
          color: "purple-3"
        },
        {
          title: "Locations",
          color: "purple-3"
        },
        {
          title: "Type Charts",
          color: "purple-3"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style>
.mainCard {
  border-radius: 10px;
  width: 40%;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
