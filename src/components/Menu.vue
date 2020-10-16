<template>
  <nav>
    <a
      v-for="(type, index) in types"
      :key="type"
      @click="handleClick(index)"
      :class="getClass(index)"
      >{{ type }}</a
    >
  </nav>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      typesData: [],
      types: [
        'ground',
        'water',
        'fire',
        'electric',
        'grass',
        'psychic',
        'rock'
      ],
      activeElementIndex: 0
    };
  },
  computed: {},
  methods: {
    fetchTypes(type) {
      fetch(`https://pokeapi.co/api/v2/type/${type}`)
        .then(res => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then(result => this.typesData.push(result))
        .catch(e => console.log(e));
    },
    handleClick(index) {
      if (index !== this.activeElementIndex) {
        this.activeElementIndex = index;

        // Fetch type only if it has not been fetched yet
        if (!this.typesData.find(e => e.name === this.types[index])) {
          this.fetchTypes(this.types[index]);
        }
      }
    },
    getClass(index) {
      if (index === this.activeElementIndex) {
        return 'active';
      } else {
        return '';
      }
    }
  },
  mounted() {
    this.fetchTypes(this.types[0]);
  }
};
</script>

<style scoped>
nav a {
  margin: 5px;
  border-right: 1px solid;
  text-align: center;
  padding-right: 5px;
}

nav a:hover {
  cursor: pointer;
  background-color: burlywood;
}

nav a.active {
  background-color: rgb(196, 133, 51);
}

nav {
  border: 1px solid;
  width: 50%;
  margin: 0 auto;
  overflow: hidden;
}
</style>
