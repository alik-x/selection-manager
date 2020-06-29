import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function numberOfEntries(mainStr, targetStr) {
  const mStr = String(mainStr).toLowerCase()
  const tStr = String(targetStr).toLowerCase()

  if (!tStr) return 0
  return (mStr.match(new RegExp(tStr, 'g')) || []).length
}

export default new Vuex.Store({
  state: {
    items: [],
    selectedItems: [],
    selectedItemsHistory: [],
    loadingItems: false,
    wasFetched: false
  },
  mutations: {
    updateItems(state, items) {
      state.items = items
      state.wasFetched = true
    },
    updateLoadingState(state, payload) {
      state.loadingItems = payload
    },
    moveItemWithHistory(state, { id, moveType }) {
      let movedItem = null
      let historyItemData = null

      if (moveType === 'add') {
        movedItem = moveItemFromTo(id, state.items, state.selectedItems)
      } else if (moveType === 'delete') {
        movedItem = moveItemFromTo(id, state.selectedItems, state.items)
      }

      if (movedItem) {
        historyItemData = { ...movedItem, moveType, date: new Date() }
        state.selectedItemsHistory.push(historyItemData)
      }

      function moveItemFromTo(id, from, to) {
        const idx = from.findIndex(i => i.id === id)

        if (idx !== -1) {
          const deletedItem = from.splice(idx, 1)[0]

          to.push(deletedItem)
          return { id: deletedItem.id, name: deletedItem.name }
        }
      }
    }
  },
  actions: {
    async fetchItems({ commit }) {
      commit('updateLoadingState', true)

      const response = await fetch(' https://api.hh.ru/specializations')
      const items = await response.json()

      commit('updateItems', items)
      commit('updateLoadingState', false)
    },
    moveItemWithHistory({ commit }, mData) {
      commit('moveItemWithHistory', mData)
    }
  },
  getters: {
    sortedHistoryItems(state) {
      return [...state.selectedItemsHistory].sort((a, b) => new Date(b.date) - new Date(a.date))
    },
    filteredItemsBy: state => searchStr => {
      if (searchStr) {
        const cacheNumOfEntries = {}

        const filtered = [...state.items].filter(item => {
          const parentCount = numberOfEntries(item.name, searchStr)
          let childProp = ''

          for (const [key, value] of Object.entries(item)) {
            childProp = Array.isArray(value) && value[0]?.hasOwnProperty('name') ? key : ''
          }

          const totalCount = childProp
            ? item[childProp].reduce((acc, i) => {
                return acc + numberOfEntries(i.name, searchStr)
              }, parentCount)
            : parentCount

          if (totalCount) {
            cacheNumOfEntries[item.id] = totalCount
          }
          return totalCount
        })
        return [...filtered].sort((a, b) => cacheNumOfEntries[b.id] - cacheNumOfEntries[a.id])
      } else return state.items
    }
  }
})
