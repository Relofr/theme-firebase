<template>
  <div class="theme-item">
    <div class="theme-item-left">
      <input type="checkbox" v-model="completed" @change="doneEdit">
        <form>
          <label>
            <input type="checkbox" class="filled-in" checked="checked" v-model="completed" @change="doneEdit"/>
            <span></span>
          </label>
        </form>
      <div v-if="!editing" @dblclick="editTheme" class="theme-item-label-title">{{ title }}</div>
      <input spellcheck="false" v-else class="theme-item-edit" type="text" v-model="title" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus>

      <div v-if="!editingHeros" @dblclick="editHeroes" class="theme-item-label">{{ heroes }}</div>
      <input v-else class="theme-item-edit" type="text" v-model="heroes" @blur="doneEditHeros" @keyup.enter="doneEditHeros" @keyup.esc="cancelHeroesEdit" v-focus>
    </div>
    <div>
      <span>Wins: {{ wins }}</span>
      <!-- <button v-on:click="addWins"></button> -->
      <i id="counterButtons" v-on:click="addWins" class="material-icons">add</i>
      <i id="counterButtons" v-on:click="subtractWins" class="material-icons">remove</i>
    </div>
    <div>
      <span>Loss: {{ loss }}</span>
      <i id="counterButtons" v-on:click="addLoss" class="material-icons">add</i>
      <i id="counterButtons" v-on:click="subtractLoss" class="material-icons">remove</i>
    </div>
    <div>
      <span>Winrate: {{ 0 || winrate().toFixed(0) }}%</span>
    </div>
    
    <div @click="removeTheme(theme.id)">
      <img src="../assets/delete.svg" class="delete-icon">
    </div>
  </div>
</template>

<script>
export default {
  name: 'theme-item',
  props: {
    theme: {
      type: Object,
      required: true,
    },
    checkAll: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      wins: 0,
      loss: 0,
      // winrate: 0,
      'id': this.theme.id,
      'title': this.theme.title,
      'heroes': this.theme.heroes,
      'completed': this.theme.completed,
      'editing': this.theme.editing,
      'editingHeros': this.theme.editingHeros,
      'beforeEditCache': '',
    }
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.theme.completed
    },
    theme() {
      this.title = this.theme.title,
      this.completed = this.theme.completed
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    winrate() {
      let totalgames = ''
      totalgames = this.wins + this.loss
      return this.wins / totalgames * 100
    },
    addWins() {
      this.wins++
    },
    subtractWins() {
      this.wins--
    },
    addLoss() {
      this.loss++
    },
    subtractLoss() {
      this.loss--
    },
    removeTheme(id) {
      this.$store.dispatch('deleteTheme', id)
    },
    editTheme() {
      this.beforeEditCache = this.title
      this.editing = true
    },
    editHeroes() {
      this.beforeEditCache = this.heroes
      this.editingHero = true
    },
    doneEdit() {
      if (this.title.trim() == '') {
        this.title = this.beforeEditCache
      }
      this.editing = false
      this.$store.dispatch('updateTheme', {
        'id': this.id,
        'title': this.title,
        'heroes': this.heroes,
        'completed': this.completed,
        'editing': this.editing
      })
    },
    doneEditHeros() {
      if (this.heroes.trim() == '') {
        this.heroes = this.beforeEditCache
      }
      this.editingHeros = false
      this.$store.dispatch('updateHeroes', {
        'id': this.id,
        'title': this.title,
        'heroes': this.heroes,
        'completed': this.completed,
        'editingHeros': this.editingHeros
      })
    },
    cancelEdit() {
      this.title = this.beforeEditCache
      this.editing = false
    },
    cancelHeroesEdit() {
      this.heroes = this.beforeEditCache
      this.editingHeros = false
    }
  },
  computed: {
    
  }
}
</script>

<style lang='scss'>

.remove-item {
  cursor: pointer;
  margin-left: 14px;
  display: block;
}

#counterButtons {
  background-color: #2a3a4a;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  -webkit-text-fill-color: #fff;
}

[type="checkbox"]:checked+span:not(.lever):before {
    top: -4px;
    left: -5px;
    width: 12px;
    height: 22px;
    border-top: 2px solid transparent;
    border-left: 2px solid transparent;
    border-right: 2px solid #70B04A !important;
    border-bottom: 2px solid #70B04A !important;
    -webkit-transform: rotate(40deg);
    transform: rotate(40deg);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
}

[type="checkbox"].filled-in:checked+span:not(.lever):before {
    top: 0;
    left: 1px;
    width: 8px;
    height: 13px;
    border-top: 2px solid transparent;
    border-left: 2px solid transparent;
    border-right: 2px solid #70B04A !important;
    border-bottom: 2px solid #70B04A !important;
    -webkit-transform: rotateZ(37deg);
    transform: rotateZ(37deg);
    -webkit-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
}

[type="checkbox"].filled-in:checked+span:not(.lever):after {
    top: 0;
    width: 20px;
    height: 20px;
    border: 2px solid #fff !important;
    background-color: #fff !important;
    z-index: 0;
}
</style>