import { createStore } from 'vuex'

export default createStore({
  state: {
    selectedCategoryData: null
  },
  getters: {
    selectedCategoryData(state) { return state.selectedCategoryData}
  },
  mutations: {
    mutationSetSelectedCategoryData (state, value) { state.selectedCategoryData = value}
  },
  actions: {
    actionSetSelectedCategoryData ({commit}, value) { commit('mutationSetSelectedCategoryData', value)}
  }
})
