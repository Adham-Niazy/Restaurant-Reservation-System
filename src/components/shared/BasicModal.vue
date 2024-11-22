<script>
import DynamicButton from "@/components/shared/DynamicButton.vue";
export default {
  components: {
    DynamicButton,
  },
  props: {
    isOpen: Boolean,
    disabled: Boolean,
    title: String,
    loading: Boolean,
  },
  methods: {
    onClose() {
      this.$emit("onClose");
    },
    onProcced() {
      this.$emit("onProcced");
    },
  },
};
</script>

<template>
  <div>
    <div
      id="basic-modal"
      tabindex="-1"
      :class="`${
        isOpen ? 'flex' : 'hidden'
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 h-full bg-black/25`"
    >
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
          >
            <h3 class="text-xl font-semibold text-gray-900">
              {{ title }}
            </h3>
          </div>
          <!-- Modal body -->
          <div
            class="p-4 md:p-5 space-y-4 bg-slate-200 max-h-[60vh] overflow-y-scroll"
          >
            <slot></slot>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center justify-end gap-3 p-4 md:p-5 border-t border-gray-200 rounded-b"
          >
            <DynamicButton btnStyle="secondary" @buttonClicked="onClose">
              Cancel
            </DynamicButton>
            <DynamicButton
              btnStyle="main"
              @buttonClicked="onProcced"
              :disabled="disabled || loading"
              :loading="loading"
            >
              Save
            </DynamicButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>