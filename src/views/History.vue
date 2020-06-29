<template>
  <div class="container">
    <h1>История</h1>
    <table class="striped">
      <thead>
        <tr>
          <th>#</th>
          <th>id</th>
          <th>Наименование</th>
          <th class="center-align">Тип перемещения</th>
          <th class="center-align">Дата и время</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in sortedHistoryItems" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td class="center-align">{{ item.moveType | formatMoveTitle }}</td>
          <td class="center-align">{{ item.date | formatDate }}</td>
        </tr>
      </tbody>
    </table>
    <hr />
    <div class="row center-align">
      <router-link to="/" class="btn-small">На главную</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'History',
  props: ['filterQuery'],
  filters: {
    formatMoveTitle(t) {
      return t === 'add' ? 'добавление' : t === 'delete' ? 'удаление' : ''
    },
    formatDate(d) {
      const date = new Date(d)
      return date.toLocaleDateString() + ' | ' + date.toLocaleTimeString()
    }
  },
  computed: {
    sortedHistoryItems() {
      if (this.filterQuery) {
        return this.$store.getters.sortedHistoryItems.filter(i => i.moveType === this.filterQuery)
      } else return this.$store.getters.sortedHistoryItems
    }
  }
}
</script>

<style scoped>
tbody {
  max-height: calc(100vh - 264px);
}
thead th:nth-child(-n + 2),
tbody td:nth-child(-n + 2) {
  width: 60px;
}
</style>
