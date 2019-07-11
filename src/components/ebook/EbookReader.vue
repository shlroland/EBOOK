<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import { FONT_FAMILY } from '../../utils/book'
import { getFontFamily, saveFontFamily, getFontSize, saveFontSize, getTheme, saveTheme } from '../../utils/LocalStorage'
import Epub from 'epubjs'
global.ePub = Epub
export default {
  mixins: [ebookMixin],
  computed: {
  },
  data () {
    return {
      fontFamilyList: FONT_FAMILY
    }
  },
  methods: {
    prevPage () {
      if (this.rendition) {
        this.rendition.prev()
        this.hideTitleAndMenu()
      }
    },
    nextPage () {
      this.rendition.next()
      this.hideTitleAndMenu()
    },
    toggleTitleAndMenu () {
      if (this.menuVisible) {
        this.setSettingVisible(-1)
        this.setFontFamilyVisible(false)
      }
      this.setMenuVisible(!this.menuVisible)
    },
    hideTitleAndMenu () {
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
    },
    initFontSize () {
      let font = getFontSize(this.fileName)
      if (!font) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.rendition.themes.fontSize(font)
        this.setDefaultFontSize(font)
      }
    },
    initFontFamily () {
      let font = getFontFamily(this.fileName)
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily)
      } else {
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },
    initTheme () {
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name
        saveTheme(this.fileName, defaultTheme)
      }
      this.setDefaultTheme(defaultTheme)
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style)
      })
      this.rendition.themes.select(defaultTheme)
    },
    initRendition () {
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      this.rendition.display().then(() => {
        this.initFontSize()
        this.initFontFamily()
        this.initTheme()
        this.initGlobalTheme()
      })
      this.rendition.hooks.content.register(contents => {
        for (let i = 0, len = this.fontFamilyList.length; i < len; i++) {
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/${this.fontFamilyList[i].font}.css`)
        }
      })
    },
    initGesture () {
      this.rendition.on('touchstart', e => {
        this.touchStartX = e.changedTouches[0].clientX
        this.touchStartTime = e.timeStamp
      })
      this.rendition.on('touchend', e => {
        const offsetX = e.changedTouches[0].clientX - this.touchStartX
        const time = e.timeStamp - this.touchStartTime
        if (time < 500 && offsetX > 40) {
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        e.preventDefault()
        e.stopPropagation()
      })
    },
    initEpub () {
      const baseUrl = `${process.env.VUE_APP_RES_URL}/epub/`
      const url = baseUrl + this.fileName + '.epub'
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.initRendition()
      this.initGesture()
      this.book.ready
        .then(() => {
          return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
        })
        .then((locations) => {
          console.log(locations)
          this.setBookAvailable(true)
        })
    }
  },
  components: {

  },
  mounted () {
    const fileName = this.$route.params.fileName
    this.setFileName(fileName).then(() => {
      this.initEpub()
    })
  }
}
</script>

<style scoped lang="scss">
</style>
