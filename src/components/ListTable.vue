<template>
  <table class="striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Наименование</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="tableType + item.id">
        <td>{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>
          <button class="btn-small" @click="$emit('update:items', item.id)">
            {{ tableType === 'selected' ? '-' : '+' }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ListTable',
  props: {
    items: Array,
    tableType: String
  }
}
</script>
