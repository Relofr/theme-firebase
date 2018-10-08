<template>
<transition name="modal">
    <div class="modal-mask" v-on:click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-contents">
            <slot name="header">{{ modalTitle }}</slot>
          </div>
          <div class="modal-buttons">
            <a class="waves-effect waves-light btn" v-on:click="$emit('close')">Cancel</a>
            <a class="waves-effect waves-light clear-btn" v-on:click="clearCompleted">Remove Selected</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  props: [ 'modalTitle' ],
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    clearCompleted() {
      this.$store.dispatch('clearCompleted')
    }
  }
}
</script>

<style>
.modal-mask {
  display: block;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  display: table;
  transition: opacity .4s ease;
}

.modal-wrapper {
  display: block;
  margin-top: 200px;
}

.modal-container {
  width: 400px;
  height: auto;
  margin: 0px auto;
  padding: 20px;
  min-height: 35px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .2s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-contents {
  margin: 0 auto;
  border-radius: 1px;
  width: 350px;
  height: 88%;
  display: block;
  position: relative;
  text-align: center;
  font-size: 24px;
  margin: 15px 0px 25px 0px;
}
.modal-buttons {
  text-align: center;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(0.95);
  transform: scale(0.95);
}
</style>
