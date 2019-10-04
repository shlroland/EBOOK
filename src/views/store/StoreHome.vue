<template>
  <div class="store-home">
    <search-bar></search-bar>
    <flap-card :data="random"></flap-card>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div class="banner-wrapper">
        <div class="banner-img" :style="{backgroundImage:`url('${banner}')`}"></div>
      </div>
      <guess-you-like :data="guessYouLike"></guess-you-like>
      <recommend class="recommend" :data="recommend"></recommend>
      <featured :data="featured" :titleText="$t('home.featured')" :btnText="$t('home.seeAll')" class="featured"></featured>
      <div class="category-list-wrapper" v-for="(item, index) in categoryList" :key="index">
        <category-book :data="item"></category-book>
      </div>
      <category class="categories" :data="categories"></category>
    </scroll>
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import Scroll from '../../components/common/scroll'
  import { storeHomeMixin } from '../../utils/mixin'
  import { home } from '../../api/store'
  import FlapCard from '../../components/home/FlapCard'
  import GuessYouLike from '../../components/home/GuessYouLike'
  import Recommend from '../../components/home/Recommend'
  import Featured from '../../components/home/Featured'
  import CategoryBook from '../../components/home/CategoryBook'
  import Category from '../../components/home/Category'

  export default {
    mixins: [storeHomeMixin],
    data () {
      return {
        scrollTop: 94,
        random: null,
        banner: '',
        guessYouLike: null,
        recommend: null,
        featured: null,
        categoryList: null,
        categories: null
      }
    },
    name: 'StoreHome',
    components: {
      SearchBar,
      Scroll,
      FlapCard,
      GuessYouLike,
      Recommend,
      Featured,
      CategoryBook,
      Category
    },
    methods: {
      onScroll (offsetY) {
        // 设置vuex的offsetY
        // SearchBar组件会进行监听
        this.setOffsetY(offsetY)
        if (offsetY > 0) {
          // 如果滚动超过0，则隐藏标题，滚动条距顶部为52像素
          this.scrollTop = 52
        } else {
          // 如果滚动为0，则显示标题，滚动条距顶部为94像素
          this.scrollTop = 94
        }
        // 刷新滚动条
        this.$refs.scroll.refresh()
      }
    },
    mounted () {
      home().then(res => {
        const data = res.data
        const randomIndex = Math.floor(Math.random() * data.random.length)
        this.random = data.random[randomIndex]
        this.banner = data.banner
        this.guessYouLike = data.guessYouLike
        this.recommend = data.recommend
        this.featured = data.featured
        this.categoryList = data.categoryList
        this.categories = data.categories
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .store-home {
    width: 100%;
    height: 100%;
    .banner-wrapper {
      width: 100%;
      padding: px2rem(10);
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      .banner-img {
        width: 100%;
        height: px2rem(150);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .recommend {
      margin-top: px2rem(20);
    }
    .featured{
      margin-top: px2rem(20);
    }
    .category-list-wrapper {
      margin-top: px2rem(20);
    }
    .categories {
      margin-top: px2rem(20);
    }
  }
</style>
