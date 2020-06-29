<template>
  <div class="input-field ">
    <input :value="value" @input="$emit('input', $event.target.value)" id="search" type="text" />
    <label class="active" for="search">Поиск</label>
    <div v-show="value" class="clear" @click="$emit('input', '')">&times;</div>
  </div>
</template>

<script>
export default {
  props: ['value']
}
</script>

<style scoped>
input#search {
  padding-right: 20px;
}

.clear {
  display: block;
  position: absolute;
  right: -17px;
  top: 7px;
  padding: 0 8px;
  font-style: normal;
  font-size: 1.5em;
  user-select: none;
  cursor: pointer;
}
</style>
