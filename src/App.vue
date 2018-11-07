<template>
  <div id="app" class="mainScreen">
    <h1>Vue.js practice project</h1>
    <router-view/>
    <footer class="footer">Built using Vue.js by Bryce Palmer</footer>
  </div>
</template>

<script>
export default {
  name: 'app',
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
}

html {
  background-color: #1c5071;    /* Found Prismview official logo colors: #1c5071 */
}
.mainScreen {
  background-color: #1c5071;
}

.footer {
  margin-top: 50px;
}

</style>
