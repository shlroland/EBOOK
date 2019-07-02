<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>

export default {}
  document.addEventListener('DOMContentLoaded',()=>{
  const html = document.querySelector('html')
  let fontSize=window.innerWidth/10
  html.style.fontSize= fontSize + 'px'
  
})

</script>


<style lang="scss">


</style>

