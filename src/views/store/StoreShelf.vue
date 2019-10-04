<template>
  <div class="store-shelf">
    <shelf-title :title="$t('shelf.title')"></shelf-title>
    <scroll
      :top="0"
      :bottom="scrollBottom"
      class="store-shelf-scroll-wrapper"
      @onScroll="onScroll"
      ref="scroll"
    >
      <shelf-search></shelf-search>
      <shelf-list :data="shelfList"></shelf-list>
    </scroll>
    <ShelfFooter></ShelfFooter>
  </div>
</template>

<script>
  import ShelfTitle from '../../components/shelf/ShelfTitle'
  import Scroll from '../../components/common/scroll'
  import ShelfSearch from '../../components/shelf/ShelfSearch'
  import ShelfList from '../../components/shelf/ShelfList'
  import { storeShelfMixin } from '../../utils/mixin'
  import ShelfFooter from '../../components/shelf/ShelfFooter'

  export default {
    mixins: [storeShelfMixin],
    data () {
      return {
        scrollBottom: 0
      }
    },
    components: {
      ShelfFooter,
      ShelfList,
      ShelfTitle,
      Scroll,
      ShelfSearch
    },
    methods: {
      onScroll (offsetY) {
        this.setOffsetY(offsetY)
      }
    },
    watch: {
      isEditMode (newVal) {
        this.scrollBottom = newVal ? 48 : 0
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      }
    },
    mounted () {
      this.getShelfList()
      this.setShelfCategory([])
      this.setCurrentType(1)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .store-shelf {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: #fff;

    .store-shelf-scroll-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 101;
    }
  }

</style>
