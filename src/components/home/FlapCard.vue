<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <div class="flap-card-bg" v-show="runFlapCardAnimation">
      <div
        class="flap-card"
        v-for="(item,index) in flapCardList"
        :key="index"
        :style="{zIndex:item.zIndex}"
      >
        <div class="flap-card-semi-circle">
          <div class="flap-card-semi-circle-left" :style="semiCircleStyle(item,'left')" ref="left"></div>
          <div
            class="flap-card-semi-circle-right"
            :style="semiCircleStyle(item,'right')"
            ref="right"
          ></div>
        </div>
         <div class="point-wrapper">
        <div class="point" :class="{'animation': runPointAnimation}" v-for="item in pointList" :key="item"></div>
      </div>
      </div>
    </div>
    <div class="close-btn-wrapper" @click="close">
      <span class="icon-close"></span>
    </div>
  </div>
</template>

<script>
import { storeHomeMixin } from "../../utils/mixin";
import { flapCardList } from "../../utils/store";

export default {
  mixins: [storeHomeMixin],
  name: "FlapCard",
  data() {
    return {
      flapCardList,
      front: 0,
      back: 1,
      intervalTime: 25,
      runFlapCardAnimation: false
    };
  },
  methods: {
    close() {
      this.stopAnimation();
      this.setFlapCardVisible(false);
    },
    semiCircleStyle(item, dir) {
      return {
        backgroundColor: `rgb(${item.r},${item.g},${item.b})`,
        backgroundSize: item.backgroundSize,
        backgroundImage: dir === "left" ? item.imgLeft : item.imgRight
      };
    },
    rotate(index, type) {
      const item = this.flapCardList[index];
      let dom;
      if (type === "front") {
        dom = this.$refs.right[index];
      } else {
        dom = this.$refs.left[index];
      }
      dom.style.transform = `rotateY(${item.rotateDegree}deg)`;
      dom.style.backgroundColor = `rgb(${item.r},${item._g},${item.b})`;
    },
    reset() {
      this.front = 0;
      this.back = 1;
      this.flapCardList.forEach((item, index) => {
        item.zIndex = 100 - index;
        item._g = item.g;
        item.rotateDegree = 0;
        this.rotate(index, "left");
      });
    },
    stopAnimation() {
      console.log(111);
      if (this.task) {
        clearInterval(this.task);
      }
      this.reset();
    },
    prepare() {
      const backFlapCard = this.flapCardList[this.back];
      backFlapCard.rotateDegree = 180;
      backFlapCard._g = backFlapCard.g - 5 * 9;
      this.rotate(this.back, "back");
    },
    flapCardRotate() {
      const frontFlapCard = this.flapCardList[this.front];
      const backFlapCard = this.flapCardList[this.back];
      frontFlapCard.rotateDegree += 10;
      frontFlapCard._g -= 5;
      backFlapCard.rotateDegree -= 10;
      if (backFlapCard.rotateDegree < 90) {
        backFlapCard._g += 5;
      }
      if (
        frontFlapCard.rotateDegree === 90 &&
        backFlapCard.rotateDegree === 90
      ) {
        backFlapCard.zIndex += 2;
      }
      this.rotate(this.front, "front");
      this.rotate(this.back, "back");
      if (
        frontFlapCard.rotateDegree === 180 &&
        backFlapCard.rotateDegree === 0
      ) {
        this.next();
      }
    },
    next() {
      const frontFlapCard = this.flapCardList[this.front];
      const backFlapCard = this.flapCardList[this.back];
      frontFlapCard.rotateDegree = 0;
      backFlapCard.rotateDegree = 0;
      frontFlapCard._g = frontFlapCard.g;
      backFlapCard._g = backFlapCard.g;
      this.rotate(this.front, "front");
      this.rotate(this.back, "back");
      this.front++;
      this.back++;
      const len = this.flapCardList.length;
      if (this.front >= len) {
        this.front = 0;
      }
      if (this.back >= len) {
        this.back = 0;
      }
      this.flapCardList.forEach((item, index) => {
        item.zIndex = 100 - ((index - this.front + len) % len);
      });
      this.prepare();
    },
    startFlapCardAnimation() {
      this.prepare();
      this.task = setInterval(() => {
        this.flapCardRotate();
      }, this.intervalTime);
    },
    stopAnimation() {
      if (this.task) {
        clearInterval(this.task);
      }
      this.reset();
    },
    runAnimation() {
      this.runFlapCardAnimation = true;
      setTimeout(() => {
        this.startFlapCardAnimation();
      }, 300);
    }
  },
  watch: {
    flapCardVisible(v) {
      if (v) {
        this.runAnimation();
      }
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/style/global";

.flap-card-wrapper {
  @include absCenter;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  @include center;
  .flap-card-bg {
    position: relative;
    width: px2rem(64);
    height: px2rem(64);
    background: white;
    border-radius: px2rem(5);
    // transform: scale(0);
    // opacity: 0;
    &.animation {
      animation: flap-card-move 0.3s ease-in both;
    }
    @keyframes flap-card-move {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      50% {
        transform: scale(1.2);
        opacity: 1;
      }
      75% {
        transform: scale(0.9);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
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
