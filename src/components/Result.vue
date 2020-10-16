<template>
  <div class="card">
    <slot> </slot>
  </div>
</template>

<script>
export default {
  name: 'Result'
};
</script>

<style scoped>
card {
  display: inline;
  border: 1px solid;
}
</style>
