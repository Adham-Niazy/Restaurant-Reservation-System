<script>
export default {
  props: {
    inputId: String,
    label: String,
    placeholder: String,
    options: {}
  },
  methods: {
    onSelect(e) {
      this.$emit('onSelet', e.target.value)
    }
  }
}
</script>

<template>
  <form class="w-full px-4">
    <label
      for="countries"
      class="block mb-2 text-sm font-medium text-gray-900"
      >{{ label }}</label
    >
    <select
      id="countries"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-700 focus:border-violet-700 block w-full p-2.5"
      @change="onSelect"
    >
      <option selected disabled>{{ placeholder }}</option>
      <option :value="option.value" v-for="option in options" :key="option.value">{{ option.label }}</option>
    </select>
  </form>
</template>