<template>
  <div class="container">
    <theme-list />
  </div>
</template>

<script>
import ThemeList from './ThemeList'

export default {
  components: {
    ThemeList
  },
  data() {
    return {

    }
  },
  computed: {
    themesFiltered() {
      return this.$store.getters.themesFiltered
    }
  }
}
</script>

<style lang='scss'>
body {
  background-color: #2a3a4a;
}

.container {
  min-width: 545px;
  margin: 0 auto;
  background: #fff;
  padding: 1em;
  border-radius: 10px;
}

</style>


