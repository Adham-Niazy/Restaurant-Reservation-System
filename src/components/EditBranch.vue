<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { getBranchDetails } from "@/services/branch.services";
import InlineLoader from "@/components/shared/InlineLoader.vue";
import BasicInput from "@/components/shared/BasicInput.vue";
import DynamicButton from "@/components/shared/DynamicButton.vue";
import "vue-multiselect/dist/vue-multiselect.min.css";
import { UI_KEYS } from "@/store/state_keys";
export default {
  components: {
    InlineLoader,
    BasicInput,
    DynamicButton,
  },
  data() {
    return {
      branchDetails: null,
      form: {
        duration: 0,
        tables: [],
        slots: [],
      },
      value: [],
      options: [
        { name: "Vue.js", code: "vu" },
        { name: "Javascript", code: "js" },
        { name: "Open Source", code: "os" },
      ],
    };
  },
  computed: {
    ...mapState(["selectedToEditBranch"]),
  },
  methods: {
    ...mapActions(["editSpecificBranch"]),
    ...mapMutations(["updateUIState"]),
    onDurationChange(change) {
      this.form.duration = change;
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
      this.form.duration = branchDetails?.reservation_duration;
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
      :value="`${form.duration}`"
      :min="0"
      type="number"
      @onInputChange="onDurationChange"
    ></BasicInput>

    <DynamicButton btnStyle="main" @buttonClicked="onSubmitEditForm">
      Submit
    </DynamicButton>
  </div>
  <div class="flex justify-center" v-else>
    <InlineLoader></InlineLoader>
  </div>
</template>