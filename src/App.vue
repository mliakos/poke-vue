<template>
  <div id="q-app" class="quicksand">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App"

  // computed: {
  //   getClassName() {
  //     // $route === "";
  //     return `quicksand bg-${"bgColor"}`;
  //   }
  // }
};
</script>
