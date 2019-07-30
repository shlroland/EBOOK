<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input
          type="text"
          v-model="searchText"
          class="slide-contents-search-input"
          :placeholder="$t('book.searchHint')"
          @keyup.enter.exact="search()"
          @click="showSearchVisible()"
        />
      </div>
      <div
        class="slide-contents-search-cancel"
        @click="hideSearchVisible()"
        v-show="searchVisible"
      >{{$t('book.cancel')}}</div>
    </div>
    <div class="slide-contents-book-wrapper" v-show="!searchVisible">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" alt="cover" class="slide-contents-book-img" />
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">{{metadata.title}}</div>
        <div class="slide-contents-book-author">{{metadata.creator}}</div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress+'%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
      </div>
    </div>
    <scroll
      class="slide-contents-list"
      :top="156"
      :bottom="48"
      ref="scroll"
      v-show="!searchVisible"
    >
      <div class="slide-contents-item" v-for="(item,index) in navigation" :key="index">
        <span
          class="slide-contents-item-label"
          :style="contentItemStyle(item)"
          :class="{'selected': section === index}"
          @click="displayci(item.href,index)"
        >{{item.label}}</span>
        <span class="slide-contents-item-page"></span>
      </div>
    </scroll>
    <scroll class="slide-search-list" :top="66" :bottom="48" v-show="searchVisible">
      <div
        class="slide-search-item"
        v-for="(item, index) in searchList"
        :key="index"
        v-html="item.excerpt"
        @click="displayci(item.cfi,true)"
      ></div>
    </scroll>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import scroll from '../common/scroll'
import { px2rem } from '../../utils/utils'
import { Promise } from 'q'
export default {
  components: {
    scroll
  },
  mixins: [ebookMixin],
  data () {
    return {
      searchVisible: false,
      searchList: null,
      searchText: null
    }
  },
  methods: {
    search () {
      if (this.searchText && this.searchText.length > 0) {
        this.doSearch(this.searchText).then((list) => {
          console.log(list)
          this.searchList = list
          this.searchList.map(item => {
            item.excerpt = item.excerpt.replace(this.searchText, `<span class="content-search-text">${this.searchText}</span>`)
            return item
          })
        })
      }
    },
    // doSearch (q) {
    //   return Promise.all(
    //     this.currentBook.spine.spineItems.map(
    //       item => item.load(this.currentBook.load.bind(this.currentBook))
    //         .then(item.find.bind(item.q))
    //         .finally(item.unload.bind(item))
    //     )
    //   ).then(results => Promise.resolve([].concat.apply([], results)))
    // },
    doSearch (q) {
      return Promise.all(
        this.currentBook.spine.spineItems.map(
          section => section.load(this.currentBook.load.bind(this.currentBook))
            .then(section.find.bind(section, q))
            .finally(section.unload.bind(section)))
      ).then(results => Promise.resolve([].concat.apply([], results)))
    },
    displayci (i, highLight = false) {
      this.display(i, () => {
        this.hideTitleAndMenu()
        if (highLight) {
          this.currentBook.rendition.annotations.highlight(i)
        }
      })
    },
    hideSearchVisible () {
      this.searchVisible = false
      this.searchText = ''
      this.searchList = null
    },
    showSearchVisible () {
      this.searchVisible = true
    },
    contentItemStyle (item) {
      const level = item.level
      return {
        marginLeft: px2rem(level * 15) + 'rem'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/style/global.scss";
.ebook-slide-contents {
  font-size: 0;
  width: 100%;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(36);
    margin: px2rem(20) 0 px2rem(10) 0;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-search-input-wrapper {
      flex: 1;
      @include center;
      .slide-contents-search-icon {
        flex: 0 0 px2rem(28);
        font-size: px2rem(12);
        @include center;
      }
      .slide-contents-search-input {
        flex: 1;
        width: 100%;
        height: px2rem(32);
        font-size: px2rem(14);
        background: transparent;
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
    .slide-contents-search-cancel {
      flex: 0 0 px2rem(50);
      font-size: px2rem(14);
      @include right;
    }
  }
  .slide-contents-book-wrapper {
    box-sizing: border-box;
    display: flex;
    flex: 0 0 px2rem(90);
    widows: 100%;
    padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
    .slide-contents-book-img-wrapper {
      flex: 0 0 px2rem(45);
      .slide-contents-book-img {
        width: px2rem(45);
        height: px2rem(60);
      }
    }
    .slide-contents-book-info-wrapper {
      flex: 1;
      box-sizing: border-box;
      padding: 0 px2rem(10);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      .slide-contents-book-title {
        text-align: center;
        width: px2rem(153.75);
        font-size: px2rem(14);
        @include ellipsis2(2);
      }
      .slide-contents-book-author {
        margin-top: px2rem(10);
        text-align: center;
        width: px2rem(153.75);
        font-size: px2rem(12);
      }
    }
    .slide-contents-book-progress-wrapper {
      flex: 0 0 px2rem(70);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .slide-contents-book-progress {
        .progress {
          font-size: px2rem(14);
        }
        .progress-text {
          font-size: px2rem(12);
        }
      }
      .slide-contents-book-time {
        font-size: px2rem(12);
      }
    }
  }
  .slide-contents-list {
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-item {
      padding: px2rem(20) 0;
      box-sizing: border-box;
      display: flex;
      .slide-contents-item-label {
        flex: 1;
        @include ellipsis;
        font-size: px2rem(14);
        line-height: px2rem(16);
      }
      \.slide-contents-item-page {
      }
    }
  }
  .slide-search-list {
    width: 100%;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-search-item {
      font-size: px2rem(14);
      line-height: px2rem(16);
      padding: px2rem(20) 0;
      box-sizing: border-box;
    }
  }
}
</style>
