<script>
export default {
  props: ["items", "headers"],
  methods: {
    rowClick(clickedItem) {
      this.$emit('onRowClicked', clickedItem)
    }
  }
};
</script>

<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-gray-700 border-b">
        <tr>
          <th v-for="header in headers" :key="header.value" scope="col" class="px-6 py-4">
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white hover:bg-gray-50 cursor-pointer" v-for="item in items" :key="item.id" @click="rowClick(item)">
          <td v-for="header in headers" :key="item.id + header.value" class="px-6 py-4">{{ item[header.value] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>