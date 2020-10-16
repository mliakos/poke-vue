<template>
  <input v-model="searchQuery" placeholder="Search for a pokemon..." type="text" @input="$emit('input', searchQuery)" />
</template>

<script>
export default {
  name: 'Input',
  data() {
    return {
      searchQuery: ''
    };
  }
};
</script>

<style scoped>
div {
  border: 1px solid;
  width: 50%;
  margin: 0 auto;
  margin-top: 100px;
}
</style>
