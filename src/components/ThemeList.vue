<template>
  <div>
    <input spellcheck="false" type="text" class="theme-input" placeholder="Add a theme" v-model="newTheme" @keyup.enter="addTheme" autofocus>
    <!-- <input type="text" class="theme-input" placeholder="Add heroes" v-model="newHero" @keyup.enter="addHero" autofocus> -->
    <div class="extra-container" id='buttons'>
      <theme-filter />
      <div>
        <transition name="fade">
          <clear-completed />
        </transition>
      </div>
    </div>

    <div v-if="$store.state.loading" class="lds-ring"><div></div><div></div><div></div><div></div></div>
    <!-- <div v-if="$store.state.loading" class="rubick-loader"><img src="../assets/rubickGIF.gif"></div> -->

    <transition-group 
      name="fade" 
      enter-active-class="animated fadeInUp" 
      leave-active-class="animated fadeOutDown">
      <theme-item
        v-for="(theme, index) in themesFiltered" :key="theme.id" :theme="theme" 
        :index="index"
        :checkAll="!anyRemaining"
        :class="{ completed : theme.completed }"
      />
    </transition-group>
    
    <div class="extra-container">
      <theme-check-all id="check-all-container"/>
      <theme-items-remaining />
    </div>
  </div>
</template>


<script>
import ThemeItem from "./ThemeItem";
import ThemeItemsRemaining from "./ThemeItemsRemaining";
import ThemeCheckAll from "./ThemeCheckAll";
import ThemeFilter from "./ThemeFilter";
import ClearCompleted from "./ClearCompleted";

export default {
  name: "theme-list",
  components: {
    ThemeItem,
    ThemeItemsRemaining,
    ThemeCheckAll,
    ThemeFilter,
    ClearCompleted
  },
  data() {
    return {
      newTheme: "",
      idForTheme: 3,
    };
  },
  created() {
    this.$store.dispatch('retreiveThemes')
  },
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining
    },
    themesFiltered() {
      return this.$store.getters.themesFiltered
    }
  },
  methods: {
    addTheme() {
      if (this.newTheme.trim().length == 0) {
        return;
      }

      this.$store.dispatch('addTheme', {
        id: this.idForTheme,
        title: this.newTheme,
      })

      this.newTheme = "";
      this.idForTheme++;
    }
  }
};
</script>

<style lang="scss">
.theme-input {
  width: 100%;
}
::placeholder {
  color: #cccccc;
  font-size: 22px;
}
.theme-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
  border-radius: 10px;
  transition: ease-in-out 0.3s;
  padding: 5px 15px 2px;
  margin: 10px 0px;
}

.theme-item-left {
  display: flex;
  align-items: center;
}
.theme-item-label {
  padding: 10px;
  margin-left: 12px;
  font-size: 16px;
}
.theme-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  &:focus {
    outline: none;
  }
}
.completed {
  transition: ease-in-out 0.3s;
  background-color: #70B04A;
  padding: 5px 15px 2px;
}
.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
}

.btn {
  border: 1px solid #4682b4;
  border-radius: 50px;
  background-color: transparent;
  color: #4682b4;
  -webkit-box-shadow: none;
  box-shadow: none;
  margin-right: 10px;
  &:focus {
    background-color: #4682b4;
    color: #fff;
    box-shadow: none;
  }
  &:hover {
    background-color: #4682b4;
    color: #fff;
    box-shadow: none;
  }
}
.active {
  background: #4682b4;
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#check-all-container {
  padding: 5px 15px 2px;
}

#buttons {
  padding: 15px 0px;
}

input[type=text]:not(.browser-default):focus:not([readonly]) {
  border-bottom: 1px solid #4682b4;
  -webkit-box-shadow: 0 1px 0 0 #4682b4;
  box-shadow: 0 1px 0 0 #4682b4;
  color: black;
  font-size: 22px;
}

:not(input):not(textarea),
:not(input):not(textarea)::after,
:not(input):not(textarea)::before {
    -webkit-user-select: none;
    user-select: none;
    cursor: default;
}
input, button, textarea, :focus {
    outline: none;
}

// .rubick-loader {
//   margin: auto;
//   position: relative;
//   width: 250px;
// }


.lds-ring {
  display: block;
  position: relative;
  width: 64px;
  height: 64px;
  margin: auto;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid #A52A2A;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #A52A2A transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>