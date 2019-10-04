<template>
<div id="store">
  <router-view>
  </router-view>
</div>
</template>

<script>
    export default {
        name: 'index.vue'
    }
</script>

<style lang="css" scoped>
  @import "../../assets/styles/global.scss";
  #store {
    width: 100%;
    height: 100%;
    background: white;
  }
</style>
