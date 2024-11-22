<script>
export default {
  props: ["btnStyle", "disabled", "loading"],
  computed: {
    appliedBtnStyles() {
      switch (this.btnStyle) {
        case "main":
          return "bg-violet-700 rounded-md text-white";
        case "secondary":
          return "border border-[#EEE] rounded-md text-black"
        default:
          return "";
      }
    },
  },
  methods: {
    handleClickEmitter() {
      this.$emit("buttonClicked");
    },
  },
};
</script>

<template>
  <button
    :disabled="disabled"
    @click="handleClickEmitter"
    :class="`${appliedBtnStyles} disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 cursor-pointer font-extralight`"
  >
    <slot v-if="!loading"></slot>
    <div v-else>Loading..</div>
  </button>
</template>