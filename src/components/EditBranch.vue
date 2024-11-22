<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { editBranch, getBranchDetails } from "@/services/branch.services";
import InlineLoader from "@/components/shared/InlineLoader.vue";
import BasicInput from "@/components/shared/BasicInput.vue";
import { FORM_KEYS } from "@/store/state_keys";
import { DESIRED_WEEK_ORDER } from "@/constants/days";
import { deepClone } from "@/utils/objects";
import TimeSlotsInput from "./shared/TimeSlotsInput.vue";
import DynamicButton from "./shared/DynamicButton.vue";
export default {
  components: {
    InlineLoader,
    BasicInput,
    TimeSlotsInput,
    DynamicButton,
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
    ...mapActions(["editSpecificBranch", "resetStateVariables", "getBranches"]),
    ...mapMutations(["updateUIState", "updateFormState"]),
    onDurationChange(change) {
      this.updateFormState({
        key: FORM_KEYS.RESERVATION_DURATION,
        change,
      });
    },
    async onDisableBranch() {
      try {
        await editBranch(this.selectedToEditBranch, {
          accepts_reservations: false,
        });
        await this.getBranches();
        await this.resetStateVariables();
      } catch (e) {
        console.log(e);
      }
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
          DESIRED_WEEK_ORDER.map((key) => [
            key,
            deepClone(branchDetails?.reservation_times[key]) || [],
          ])
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
    <div class="flex flex-col items-end">
      <DynamicButton @buttonClicked="onDisableBranch">
        <span class="text-red-500">Disable Reservations</span>
      </DynamicButton>
      <h2
        class="border-violet-700 border-y w-full bg-violet-700/20 text-violet-700 font-light p-3 mt-2"
      >
        Branch working hours are {{ branchDetails.opening_from }} -
        {{ branchDetails.opening_to }}
      </h2>
    </div>

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