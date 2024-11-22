<script>
import InlineLoader from "./shared/InlineLoader.vue";
export default {
  components: { InlineLoader },
  props: ["items", "headers", "loading"],
  methods: {
    rowClick(clickedItem) {
      this.$emit("onRowClicked", clickedItem);
    },
  },
};
</script>

<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-gray-700 border-b">
        <tr>
          <th
            v-for="header in headers"
            :key="header.value"
            scope="col"
            class="px-6 py-4"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody v-if="items.length > 0">
        <tr
          class="bg-white hover:bg-gray-50 cursor-pointer"
          v-for="item in items"
          :key="item.id"
          @click="rowClick(item)"
        >
          <td
            v-for="header in headers"
            :key="item.id + header.value"
            class="px-6 py-4"
          >
            {{ item[header.value] }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading" class="flex justify-center py-10">
      <inline-loader></inline-loader>
    </div>
    <h3
      class="py-4 text-xl text-gray-600 font-light text-center"
      v-if="!loading && items.length === 0"
    >
      No Items Found
    </h3>
  </div>
</template>