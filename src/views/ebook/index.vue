<template>
  <div class="ebook">
    <ebook-tittle></ebook-tittle>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
import EbookReader from '../../components/ebook/EbookReader'
import EbookTittle from '../../components/ebook/EbookTittle'
import EbookMenu from '../../components/ebook/EbookMenu'
import { getReadTime, saveReadTime } from '../../utils/LocalStorage'
import { setInterval, clearInterval } from 'timers'
import { ebookMixin } from '../../utils/mixin'

export default {
  mixins: [ebookMixin],
  data () {
    return {

    }
  },
  components: {
    EbookReader,
    EbookTittle,
    EbookMenu
  },
  mounted () {
    this.startLoopReadTime()
  },
  beforeDestroy () {
    if (this.task) {
      clearInterval(this.task)
    }
  },
  methods: {
    startLoopReadTime () {
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        readTime = 0
      }
      this.task = setInterval(() => {
        readTime++
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/style/global.scss";
</style>
