<template>
  <div class="store-shelf">
    <shelf-title :title="shelfCategory.title"></shelf-title>
    <scroll
      :top="0"
      :bottom="scrollBottom"
      class="store-shelf-scroll-wrapper"
      @onScroll="onScroll"
      ref="scroll"
      v-if="ifShowList"
    >
      <shelf-list :top="42" :data="shelfCategory.itemList"></shelf-list>
    </scroll>
    <div class="store-shelf-empty-view" v-else>{{$t('shelf.groupNone')}}</div>
    <ShelfFooter></ShelfFooter>
  </div>
</template>

<script>
  import ShelfTitle from '../../components/shelf/ShelfTitle'
  import Scroll from '../../components/common/scroll'
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
    computed: {
      ifShowList () {
        return this.shelfCategory.itemList && this.shelfCategory.itemList.length > 0
      }
    },
    components: {
      ShelfFooter,
      ShelfList,
      ShelfTitle,
      Scroll,
    },
    methods: {
      onScroll (offsetY) {
        this.setOffsetY(offsetY)
      },
    },
    watch: {
      isEditMode (newVal) {
        this.scrollBottom = newVal ? 48 : 0
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
      }
    },
    mounted () {
      this.getCategoryList(this.$route.query.title)
      this.setCurrentType(2)
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

    .store-shelf-empty-view {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: px2rem(14);
      color: #333;
      @include center;
    }
  }

</style>
