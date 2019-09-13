<template>
  <div class="flap-card-wrapper">
    <div class="flap-card-bg">
      <div class="flap-card" v-for="(item,index) in flapCardList" :key="index" :style="{zIndex:item.zIndex}">
        <div class="flap-card-semi-circle">
          <div class="flap-card-semi-circle-left" :style="semiCircleStyle(item,'left')"></div>
          <div class="flap-card-semi-circle-right" :style="semiCircleStyle(item,'right')"></div>
        </div>
      </div>
    </div>
    <div class="close-btn-wrapper" @click="close">
      <span class="icon-close"></span>
    </div>
  </div>
</template>

<script>
  import { storeHomeMixin } from '../../utils/mixin'
  import { flapCardList } from '../../utils/store'

  export default {
    mixins: [storeHomeMixin],
    name: 'FlapCard',
    data () {
      return {
        flapCardList
      }
    },
    methods: {
      close () {
        this.setFlapCardVisible(false)
      },
      semiCircleStyle (item, dir) {
        return {
          backgroundColor: `rgb(${item.r},${item.g},${item.b})`,
          backgroundSize: item.backgroundSize,
          backgroundImage: dir === 'left' ? item.imgLeft : item.imgRight
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/global";

  .flap-card-wrapper {
    @include absCenter;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    @include center;
    .flap-card-bg {
      position: relative;
      width: px2rem(64);
      height: px2rem(64);
      background: white;
      border-radius: px2rem(5);
      /*transform: scale(0);*/
      /*opacity: 0;*/
      /*&.animation {*/
      /*  <!--animation: flap-card-move $firstShowTime ease-in both;-->*/
      /*}*/
      /*@keyframes flap-card-move {*/
      /*  0% {*/
      /*    transform: scale(0);*/
      /*    opacity: 0;*/
      /*  }*/
      /*  50% {*/
      /*    transform: scale(1.2);*/
      /*    opacity: 1;*/
      /*  }*/
      /*  75% {*/
      /*    transform: scale(.9);*/
      /*    opacity: 1;*/
      /*  }*/
      /*  100% {*/
      /*    transform: scale(1);*/
      /*    opacity: 1;*/
      /*  }*/
      /*}*/
      .flap-card {
        z-index: 1500;
        width: px2rem(48);
        height: px2rem(48);
        @include absCenter;
        .flap-card-semi-circle {
          width: 100%;
          height: 100%;
          display: flex;
          .flap-card-semi-circle-left {
            flex: 0 0 50%;
            width: 50%;
            height: 100%;
            background-color: #ffc666;
            background-repeat: no-repeat;
            background-position: center right;
            border-radius: px2rem(24) 0 0 px2rem(24);
            transform-origin: right;
            backface-visibility: hidden;
          }

          .flap-card-semi-circle-right {
            flex: 0 0 50%;
            width: 50%;
            height: 100%;
            background-repeat: no-repeat;
            background-position: center left;
            border-radius: 0 px2rem(24) px2rem(24) 0;
            transform-origin: left;
            backface-visibility: hidden;
          }
        }
      }
    }
    .close-btn-wrapper {
      position: absolute;
      left: 0;
      bottom: 5%;
      z-index: 1100;
      width: 100%;
      @include center;
      .icon-close {
        display: inline-block;
        width: px2rem(45);
        height: px2rem(45);
        font-size: px2rem(25);
        color: white;
        background: #333;
        border-radius: 50%;
        @include center;
      }
    }
  }
</style>
