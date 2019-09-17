<template>
<div class="store">
  <router-view>
  </router-view>
</div>
</template>

<script>
    export default {
        name: 'index.vue'
    }
</script>

<style scoped>
@import "../../assets/styles/global.scss";
  .store{
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
</style>
