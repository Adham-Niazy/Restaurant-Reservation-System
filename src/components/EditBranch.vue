<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { getBranchDetails } from "@/services/branch.services";
import InlineLoader from "@/components/shared/InlineLoader.vue";
import BasicInput from "@/components/shared/BasicInput.vue";
import { FORM_KEYS } from "@/store/state_keys";
import { DESIRED_WEEK_ORDER } from "@/constants/days";
import { deepClone } from "@/utils/objects";
import TimeSlotsInput from "./shared/TimeSlotsInput.vue";
export default {
  components: {
    InlineLoader,
    BasicInput,
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
        change: Object.fromEntries(
          DESIRED_WEEK_ORDER.map((key) => [key, deepClone(branchDetails?.reservation_times[key])])
        ),
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
  </div>
  <div class="flex justify-center" v-else>
    <InlineLoader></InlineLoader>
  </div>
</template>