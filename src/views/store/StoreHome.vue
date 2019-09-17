<template>
  <div class="store-home">
    <search-bar></search-bar>
    <flap-card :data="random"></flap-card>
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
  import { home } from '../../api/store'
  import FlapCard from '../../components/home/FlapCard'

  export default {
    mixins: [storeHomeMixin],
    data () {
      return {
        scrollTop: 94,
        random: null,
        banner: null
      }
    },
    name: 'StoreHome',
    components: {
      SearchBar,
      Scroll,
      FlapCard
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
    },
    mounted () {
      home().then(res => {
        const data = res.data
        const randomIndex = Math.floor(Math.random() * data.random.length)
        this.random = data.random[randomIndex]
      })
    }
  }
</script>

<style scoped>
  @import "../../assets/style/global.scss";
</style>
