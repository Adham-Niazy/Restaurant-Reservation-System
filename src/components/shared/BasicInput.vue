<script>
export default {
  props: {
    type: String,
    placeholder: String,
    label: String,
    required: Boolean,
    name: String,
    disabled: Boolean,
    inputClass: String,
    wrapperClass: String,
    value: String,
    min: Number
  },
  methods: {
    onChangeInput(e) {
      this.$emit('onInputChange', e?.target?.value)
    }
  }
};
</script>

<template>
  <div :class="`${wrapperClass}`">
    <label :for="name" v-if="label">
      {{ label }}
      <span v-if="required" class="text-[#D91C12]">*</span>
      <span v-else>&nbsp; (optional)</span>
    </label>
    <div class="relative mt-2">
      <input
        :id="name"
        :name="name"
        :type="type"
        :disabled="disabled"
        :placeholder="placeholder"
        :min="min"
        :value="value"
        :class="`w-full rounded-xl focus:shadow-none focus:border-violet-500 focus:outline-none
      border border-[#AAA] py-4 px-[14px] ${inputClass || ''}`"
        @change="onChangeInput"
      />
    </div>
  </div>
</template>