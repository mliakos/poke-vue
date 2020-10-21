<template>
  <div id="q-app" class="quicksand">
    <router-view :style="`background-color: ${backgroundColor}`" />
  </div>
</template>
<script>
export default {
  name: "App",

  computed: {
    // Dynamically change route background color
    backgroundColor() {
      console.log(this.$route);
      if (this.$route.fullPath === "/pokedex") {
        return "white";
      }

      return "pink";
    }
  }
};
</script>

<style scoped></style>
