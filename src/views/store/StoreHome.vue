<template>
  <div class="store-home">
    <search-bar></search-bar>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
      <div>111111111111</div>
    </scroll>
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import Scroll from '../../components/common/scroll'
  import { storeHomeMixin } from '../../utils/mixin'

  export default {
    mixins: [storeHomeMixin],
    data () {
      return {
        scrollTop: 94
      }
    },
    name: 'StoreHome',
    components: {
      SearchBar,
      Scroll
    },
    methods: {
      onScroll (offsetY) {
        this.setOffsetY(offsetY)
        if (offsetY > 0) {
          this.scrollTop = 52
        } else {
          this.scrollTop = 94
        }
        this.$ref.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/style/global.scss";
</style>
