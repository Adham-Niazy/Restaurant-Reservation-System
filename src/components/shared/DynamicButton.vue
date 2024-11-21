<script>
export default {
  props: ["btnStyle"],
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
    @click="handleClickEmitter"
    :class="`${appliedBtnStyles} px-4 py-2 cursor-pointer font-extralight`"
  >
    <slot></slot>
  </button>
</template>