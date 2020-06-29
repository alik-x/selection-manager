<template>
  <div class="container">
    <h1>Главная</h1>
    <div class="row">
      <SearchField v-model="search" class="col s5" />
    </div>
    <div class="row">
      <div class="col s6 right-divider">
        <Preloader v-if="loading" />
        <ListTable v-else :items.sync="filteredItems" />
      </div>
      <div class="col s6">
        <ListTable :items.sync="selectedItems" :tableType="'selected'" />
      </div>
    </div>
    <hr />
    <div class="row center-align">
      <router-link to="/history" class="btn-small">История</router-link>
      <router-link to="/history?filter=add" class="btn-small">История добавлений</router-link>
      <router-link to="/history?filter=delete" class="btn-small">История удалений</router-link>
    </div>
  </div>
</template>

<script>
import Preloader from '@/components/Preloader.vue'
import SearchField from '@/components/SearchField.vue'
import ListTable from '@/components/ListTable.vue'
export default {
  components: { Preloader, SearchField, ListTable },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    filteredItems: {
      get() {
        return this.$store.getters.filteredItemsBy(this.search)
      },
      set(id) {
        this.$store.dispatch('moveItemWithHistory', { id, moveType: 'add' })
      }
    },
    selectedItems: {
      get() {
        return this.$store.state.selectedItems
      },
      set(id) {
        this.$store.dispatch('moveItemWithHistory', { id, moveType: 'delete' })
      }
    },
    loading() {
      return this.$store.state.loadingItems
    }
  },
  created() {
    if (!this.$store.state.wasFetched) {
      this.$store.dispatch('fetchItems')
    }
  }
}
</script>

<style scoped>
.right-divider {
  border-right: 1px dashed rgb(160, 160, 160);
}

.btn-small {
  margin: 0 5px;
}
</style>
