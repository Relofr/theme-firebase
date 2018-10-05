<template>
  <div class="items-remaining">{{ remaining }} items left</div>
</template>

<script>
export default {
  name: 'theme-remaining',
  computed: {
    remaining() {
      return this.$store.getters.remaining
    }
  }
}
</script>

<style>
.items-remaining {
  margin-bottom: -20px;
  color: grey;
}
</style>