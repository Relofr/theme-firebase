import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loading: true,
    filter: "all",
    themes: []
  },
  getters: {
    remaining(state) {
      return state.themes.filter(theme => !theme.completed).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0;
    },
    themesFiltered(state) {
      if (state.filter == "all") {
        return state.themes;
      } else if (state.filter == "active") {
        return state.themes.filter(theme => !theme.completed);
      } else if (state.filter == "completed") {
        return state.themes.filter(theme => theme.completed);
      }

      return state.themes;
    },
    showClearCompletedButton(state) {
      return state.themes.filter(theme => theme.completed).length > 0;
    }
  },
  mutations: {
    addTheme(state, theme) {
      state.themes.push({
        id: theme.id,
        title: theme.title,
        heroes: theme.heroes,
        completed: false,
        timestamp: new Date(),
        editing: false
      })
    },
    clearCompleted(state) {
      state.themes = state.themes.filter(theme => !theme.completed);
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    checkAll(state, checked) {
      state.themes.forEach(theme => (theme.completed = checked));
    },
    deleteTheme(state, id) {
      const index = state.themes.findIndex(item => item.id == id);

      if (index >= 0) {
        state.themes.splice(index, 1);
      }
    },
    updateTheme(state, theme) {
      const index = state.themes.findIndex(item => item.id == theme.id);
      state.themes.splice(index, 1, {
        'id': theme.id,
        'title': theme.title,
        'completed': theme.completed,
        'editing': theme.editing
      });
    },
    updateHeroes(state, theme) {
      const index = state.themes.findIndex(item => item.id ==theme.id);
      state.themes.splice(index, 1, {
        'id': theme.id,
        'heroes': theme.heroes,
        'completed': theme.complted,
        'doneEditHeros': theme.doneEditHeros
      })
    },
    retreiveThemes(state, themes) {
      state.themes = themes
    },
    updateLoading(state, loading) {
      state.loading = loading
    }
  },
  actions: {
    initRealTimeListeners(context) {
      db.collection("themes").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            const source = change.doc.metadata.hasPendingWrites ? "Local" : "Server";

            if (source == 'Server') {
              context.commit('addTheme', {
                id: change.doc.id,
                title: change.doc.data().title,
                completed: false
              })
            }
          }
          if (change.type === "modified") {
            context.commit('updateTheme', {
              id: change.doc.id,
              title: change.doc.data().title,
              completed: change.doc.data().completed
            })
          }
          if (change.type === "removed") {
            context.commit('deleteTheme', change.doc.id)
          }
        });
      });
    },
    retreiveThemes(context) {
      context.commit('updateLoading', true)
      db.collection('themes').get()
        .then(QuerySnapshot => {
          let tempThemes = []
          QuerySnapshot.forEach(doc => {
            console.log(doc.data())
            const data = {
              id: doc.id,
              title: doc.data().title,
              heroes: doc.data().heroes,
              completed: doc.data().completed,
              timestamp: doc.data().timestamp,
            }

            tempThemes.push(data)
          })

          context.commit('updateLoading', false)
          const tempThemesSorted = tempThemes.sort((a, b) => {
            return a.timestamp.seconds - b.timestamp.seconds
          })

          context.commit('retreiveThemes', tempThemesSorted)
        })
    },
    addTheme(context, theme) {
      db.collection('themes').add({
        title: theme.title,
        heroes: theme.heroes,
        completed: false,
        timestamp: new Date(),
      })
      .then(docRef => {
        context.commit('addTheme', {
          id: docRef.id,
          title: theme.title,
          heroes: theme.heroes,
          completed: false
        })
    },
    deleteTheme(context, id) {
      db.collection('themes').doc(id).delete()
        .then(() => {
          context.commit('deleteTheme', id)
        })
    },
    updateTheme(context, theme) {
      db.collection('themes').doc(theme.id).set({
        id: theme.id,
        title: theme.title,
        heroes: theme.heroes,
        completed: theme.completed,
        timestamp: new Date()
      })
      .then(() => {
        context.commit('updateTheme', theme)
      })
    },
    checkAll(context, checked) {
      db.collection('themes').get()
        .then(QuerySnapshot => {
          QuerySnapshot.forEach(doc => {
            doc.ref.update({
                completed: checked,
              })
              .then(() => {
                context.commit('checkAll', checked)
              })
          })
        })
    },
    updateFilter(context, filter) {
      context.commit('updateFilter', filter)
    },
    clearCompleted(context) {
      db.collection('themes').where('completed', '==', true).get()
        .then(QuerySnapshot => {
          QuerySnapshot.forEach(doc => {
            doc.ref.delete()
              .then(() => {
                context.commit('clearCompleted')
              })
          })
        })
    }
  }
})
