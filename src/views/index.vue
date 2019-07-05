<template>
  <div class="ebook">
    <ebook-tittle></ebook-tittle>
    <ebook-reader>
    </ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
import EbookReader from '../components/ebook/EbookReader'
import EbookTittle from '../components/ebook/EbookTittle'
import EbookMenu from '../components/ebook/EbookMenu'
export default {

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

  }

}
</script>

<style scoped lang="scss">
@import "../assets/style/global.scss";
</style>
