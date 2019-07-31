<template>
  <div class="store-home">
  <search-bar></search-bar>
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'

  export default {
    name: 'StoreHome',
    components:{
      SearchBar
    }
  }
</script>

<style scoped>
  @import "../../assets/style/global.scss";
</style>
