<template>
  <div class="ebook-reader">
    <div id="read"></div>
    <div class="ebook-reader-mask"
         @click="onMaskClick"
         @touchmove="move"
         @touchend="moveEnd"
         @mousedown.left="onMouseEnter"
         @mousemove.left="onMouseMove"
         @mouseup.left="onMouseEnd"
    ></div>
  </div>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  import { FONT_FAMILY, flatten } from '../../utils/book'
  import {
    getFontFamily,
    saveFontFamily,
    getFontSize,
    saveFontSize,
    getTheme,
    saveTheme,
    getLocation
  } from '../../utils/LocalStorage'
  import Epub from 'epubjs'
  import { getLocalForage } from '../../utils/localforage'

  global.ePub = Epub
  export default {
    mixins: [ebookMixin],
    computed: {},
    data () {
      return {
        fontFamilyList: FONT_FAMILY
      }
    },
    methods: {
      onMouseEnd (e) {
        if (this.mouseState === 2) {
          this.setOffsetY(0)
          this.firstOffsetY = null
          this.mouseState = 3
        }
        const time = e.timeStamp - this.mouseStartTime
        if (time < 200) {
          this.mouseState = 4
        }
        e.preventDefault()
        e.stopPropagation()
      },
      onMouseMove (e) {
        if (this.mouseState === 1) {
          this.mouseState = 2
        } else if (this.mouseState === 2) {
          let offsetY = e.clientY - this.firstOffsetY
          this.setOffsetY(offsetY)
        } else {
          this.firstOffsetY = e.clientY
        }
        e.preventDefault()
        e.stopPropagation()
      },
      onMouseEnter (e) {
        this.mouseState = 1
        this.mouseStartTime = e.timeStamp
        e.preventDefault()
        e.stopPropagation()
      },
      move (e) {
        let offsetY = 0
        if (this.firstOffsetY) {
          offsetY = e.changedTouches[0].clientY - this.firstOffsetY
          this.setOffsetY(offsetY)
        } else {
          this.firstOffsetY = e.changedTouches[0].clientY
        }
        e.preventDefault()
        e.stopPropagation()
      },
      moveEnd () {
        this.setOffsetY(0)
        this.firstOffsetY = null
      },
      onMaskClick (e) {
        if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) {
          return
        }
        const offsetX = e.offsetX
        const width = window.innerWidth
        if (offsetX > 0 && offsetX < width * 0.3) {
          this.prevPage()
        } else if (offsetX > 0 && offsetX > width * 0.7) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
      },
      prevPage () {
        if (this.rendition) {
          this.rendition.prev().then(() => {
            this.refreshLocation()
          })
          this.hideTitleAndMenu()
        }
      },
      nextPage () {
        this.rendition.next().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      },
      toggleTitleAndMenu () {
        if (this.menuVisible) {
          this.setSettingVisible(-1)
          this.setFontFamilyVisible(false)
        }
        this.setMenuVisible(!this.menuVisible)
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
        const location = getLocation(this.fileName)
        this.display(location, () => {
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
      parseBook () {
        this.book.loaded.cover.then(cover => {
          this.book.archive.createUrl(cover).then(url => {
            this.setCover(url)
          })
        })
        this.book.loaded.metadata.then(metadata => {
          this.setMetadata(metadata)
        })
        this.book.loaded.navigation.then(nav => {
          const navItems = flatten(nav.toc)

          function find (item, level = 0) {
            return !item.parent ? level : find(navItems.filter(parentItems => parentItems.id === item.parent)[0], ++level)
          }

          navItems.forEach(item => {
            item.level = find(item)
          })
          this.setNavigation(navItems)
        })
      },
      initEpub (url) {
        this.book = new Epub(url)
        this.setCurrentBook(this.book)
        this.initRendition()
        this.initGesture()
        this.parseBook()
        this.book.ready
          .then(() => {
            return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
          })
          .then((locations) => {
 this.navigation.forEach(nav => {
            nav.pagelist = []
          })
            locations.forEach(item => {
              const loc = item.match(/\[(.*)\]!/)[1]
              this.navigation.forEach(nav => {
                if (nav.href) {
                  const href = nav.href.match(/^(.*)\.html$/)
                  if (href) {
                    if (href[1] === loc) {
                      nav.pagelist.push(item)
                    }
                  }
                }
              })
              let currentPage = 1
              this.navigation.forEach((nav, index) => {
                if (index === 0) {
                  nav.page = 1
                } else {
                  nav.page = currentPage
                }
                currentPage += nav.pagelist.length + 1
              })
            })
            // console.log(locations)
            this.refreshLocation(locations)
            this.setBookAvailable(true)
            this.refreshLocation()
          })
      }
    },
    components: {},
    mounted () {
      const books = this.$route.params.fileName.split('|')
      const fileName = books[1]
      console.log(books)
      getLocalForage(fileName, (err, blob) => {
        if (!err && blob) {
          this.setFileName(books.join('/')).then(() => {
            this.initEpub(blob)
          })
        } else {
          console.log('在线获取')
          this.setFileName(this.$route.params.fileName.split('|').join('/')).then(() => {
            const url = process.env.VUE_APP_RES_URL + '/epub/' + this.fileName + '.epub'
            this.initEpub(url)
          })
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global.scss";

  .ebook-reader {
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 150;

    .ebook-reader-mask {
      position: absolute;
      top: 0;
      left: 0;
      background-color: transparent;
      z-index: 151;
      width: 100%;
      height: 100%;
    }
  }
</style>
