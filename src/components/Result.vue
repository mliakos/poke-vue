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
.card {
  border: 1px solid;
  border-radius: 2px;
  width: 50%;
  margin: 0 auto;
  margin-bottom: 5px;
}
</style>
