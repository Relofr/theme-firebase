<template>
  <div>
    <!-- <a class="waves-effect waves-light clear-btn" v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</a> -->
    <a class="waves-effect waves-light clear-btn" v-if="showClearCompletedButton" id="show-modal" v-on:click="showModal = true">Clear Completed</a>
    <modal v-if="showModal" v-on:close="showModal = false">
    <span slot="header">Are you sure?</span>
  </modal>
  </div>
</template>

<script>
import modal from './modal'

export default {
  name: 'theme-clear-completed',
  data() {
    return {
      showModal: false
    }
  },
  components: { modal },
  computed: {
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton
    }
  },
  methods: {
    clearCompleted() {
      this.$store.dispatch('clearCompleted')
    }
  }
}
</script>

<style lang='scss'>
.clear-btn {
  border: 1px solid #A52A2A;
  border-radius: 50px;
  background-color: transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
  margin-right: 10px;
  padding: 5px 15px;
  color: #A52A2A;
  &:focus {
    background-color: #A52A2A;
    color: #fff;
    box-shadow: none;
  }
  &:hover {
    background-color: #A52A2A;
    color: #fff;
    box-shadow: none;
  }
}
</style>