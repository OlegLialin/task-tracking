import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(t => {
      if (new Date(t.date) < new Date()) {
        t.status = 'outdated'
      }
      return t
    })
  },
  mutations: {
    createTask(state, task) {
      state.tasks.push(task)

      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updateTask(state, {id, description, date}) {
      const tasks = state.tasks.concat();
      const status = new Date(date) > new Date() ? 'active' : 'outdated';
      state.tasks = tasks.map( t => {
        if(t.id === id) {
          t = {...t, date, description, status}
        }
        return t
      });
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    completeTask(state, id) {
      const idx = state.tasks.findIndex(t => t.id === id);
      state.tasks[idx].status = 'completed';
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },
  actions: {
    createTask({commit}, task) {
      commit('createTask', task)
    },
    updateTask({commit}, task) {
      commit('updateTask', task)
    },
    completeTask({commit}, id) {
      commit('completeTask', id)
    }

  },
  modules: {
  },
  getters: {
    tasks: s => s.tasks,
    taskById: s => id => s.tasks.find(t => t.id === id)
  }
})
