<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { getBranchDetails } from "@/services/branch.services";
import InlineLoader from "@/components/shared/InlineLoader.vue";
import BasicInput from "@/components/shared/BasicInput.vue";
import DynamicButton from "@/components/shared/DynamicButton.vue";
import "vue-multiselect/dist/vue-multiselect.min.css";
import { FORM_KEYS, UI_KEYS } from "@/store/state_keys";
import TimeSlotsInput from "./shared/TimeSlotsInput.vue";
export default {
  components: {
    InlineLoader,
    BasicInput,
    DynamicButton,
    TimeSlotsInput,
  },
  data() {
    return {
      branchDetails: null,
    };
  },
  computed: {
    ...mapState(["selectedToEditBranch", "form"]),
  },
  methods: {
    ...mapActions(["editSpecificBranch"]),
    ...mapMutations(["updateUIState", "updateFormState"]),
    onDurationChange(change) {
      this.updateFormState({
        key: FORM_KEYS.RESERVATION_DURATION,
        change,
      });
    },
    onSubmitEditForm() {
      this.editSpecificBranch();
      this.updateUIState({
        key: UI_KEYS.IS_MODAL_OPEN,
        change: false,
      });
    },
  },
  async mounted() {
    try {
      const { data: branchDetails } = await getBranchDetails(
        this.selectedToEditBranch
      );
      this.branchDetails = branchDetails;
      this.updateFormState({
        key: FORM_KEYS.RESERVATION_DURATION,
        change: branchDetails?.reservation_duration,
      });
      this.updateFormState({
        key: FORM_KEYS.RESERVATION_TIMES,
        change: branchDetails?.reservation_times,
      });
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<template>
  <div class="flex flex-col gap-5" v-if="branchDetails">
    <h2
      class="border-violet-700 border-y bg-violet-700/20 text-violet-700 font-light p-3"
    >
      Branch working hours are {{ branchDetails.opening_from }} -
      {{ branchDetails.opening_to }}
    </h2>

    <BasicInput
      name="branchReservationDuration"
      label="Resertvation Duration (minutes)"
      :required="true"
      :value="`${form.reservation_duration}`"
      :min="0"
      type="number"
      @onInputChange="onDurationChange"
    ></BasicInput>

    <TimeSlotsInput></TimeSlotsInput>

    <DynamicButton btnStyle="main" @buttonClicked="onSubmitEditForm">
      Submit
    </DynamicButton>
  </div>
  <div class="flex justify-center" v-else>
    <InlineLoader></InlineLoader>
  </div>
</template>