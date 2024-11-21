<script>
import DynamicButton from "@/components/shared/DynamicButton.vue";
export default {
  components: {
    DynamicButton,
  },
  methods: {
    handleClicked() {
      console.log("CLICKED");
    },
  },
};
</script>

<template>
  <nav
    class="flex justify-between items-center px-12 py-5 border-b border-[#EEE]"
  >
    <h2 class="font-light">Reservations</h2>
    <DynamicButton
      @buttonClicked="handleClicked"
      btnStyle="main"
      @click="handleClicked"
    >
      Disable Reservation
    </DynamicButton>
  </nav>
</template>