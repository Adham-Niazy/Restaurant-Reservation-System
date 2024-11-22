<script>
import DynamicButton from "@/components/shared/DynamicButton.vue";
import { mapActions, mapGetters } from "vuex";
import { editBranch } from "@/core/services/branch.services";
export default {
  data() {
    return { isLoading: false };
  },
  components: {
    DynamicButton,
  },
  computed: {
    ...mapGetters(["getEnabledBranchesForReservations"]),
  },
  methods: {
    ...mapActions(['getBranches']),
    async handleClicked() {
      this.isLoading = true;
      const branchesPromises = this.getEnabledBranchesForReservations.map((branch) =>
        editBranch(branch.id, {
          accepts_reservations: false,
        })
      );
      try {
        await Promise.all(branchesPromises);
        await this.getBranches();
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<template>
  <nav
    class="flex justify-between items-center px-12 py-5 border-b border-[#EEE] bg-white"
  >
    <h2 class="font-light">Reservations</h2>
    <DynamicButton
      @buttonClicked="handleClicked"
      btnStyle="main"
      @click="handleClicked"
      :loading="isLoading"
      :disabled="isLoading"
    >
      Disable Reservation
    </DynamicButton>
  </nav>
</template>