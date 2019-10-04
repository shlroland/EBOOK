<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>

export default {}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  html.style.fontSize = fontSize + 'px'
})
</script>

<style lang="scss" scoped>
  #app {
    width: 100%;
    height: 100%;
    background: #7d8188;
    overflow: hidden;
  }
</style>
