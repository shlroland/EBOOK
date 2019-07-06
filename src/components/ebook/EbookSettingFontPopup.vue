<template>
  <transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
      <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hide">
          <span class="icon-down2"></span>
        </div>
        <span class="ebook-popup-title-text">选择字体</span>
      </div>
      <div class="ebook-popup-list-wrapper">
        <div class="ebook-popup-list-item" v-for="(item, index) in fontFamilyList" :key="index">
          <div class="ebook-popup-list-text" :class="{'select':isSelected(item)}">{{item.font}}</div>
          <div class="ebook-popup-list-icon" v-if="isSelected(item)">
            <span class="icon-check"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import { FONT_FAMILY } from '../../utils/book'
export default {
  mixins: [ebookMixin],
  data () {
    return {
      fontFamilyList: FONT_FAMILY
    }
  },

  methods: {
    hide () {
      this.setFontFamilyVisible(false)
    },
    isSelected (item) {
      return this.defaultFontFamily === item.font
    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
@import "../../assets/style/global.scss";
.ebook-popup-list {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 300;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, 0.1);
  .ebook-popup-title {
    position: relative;
    padding: px2rem(15);
    box-sizing: border-box;
    border-bottom: px2rem(1) solid #b8b9bb;
    @include center;
    .ebook-popup-title-icon {
      position: absolute;
      left: px2rem(15);
      top: 0;
      height: 100%;
      font-size: px2rem(16);
      font-weight: bold;
      @include center;
    }
    .ebook-popup-title-text {
      font-size: px2rem(14);
      font-weight: bold;
    }
  }
  .ebook-popup-list-wrapper {
    max-height: 40vh;
    overflow-y: auto;
    .ebook-popup-list-item {
      display: flex;
      border-bottom: 1px solid #ccc;
      padding: px2rem(15);
      .ebook-popup-list-text {
        flex: 1;
        font-size: px2rem(14);
        text-align: left;
        &.select{
          color: #346cb9;
          font-weight: bold;
        }
      }
      .ebook-popup-list-icon {
        flex: 1;
        text-align: right;
        font-size: px2rem(14);
        font-weight: bold;
        color: #346cb9;
      }
    }
  }
}
</style>
