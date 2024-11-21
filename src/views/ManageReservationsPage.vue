<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import DynamicButton from "@/components/shared/DynamicButton.vue";
import AddBranch from "@/components/AddBranch.vue";
import EditBranch from "@/components/EditBranch.vue";
import BranchesTable from "@/components/BranchesTable.vue";
import BasicModal from "@/components/shared/BasicModal.vue";
import { UI_KEYS } from "@/store/state_keys";
export default {
  components: {
    DynamicButton,
    BranchesTable,
    BasicModal,
    AddBranch,
    EditBranch,
  },
  computed: {
    ...mapState(["selectedToAddBranch", "ui"]),
    ...mapGetters(["getEnabledBranchesForReservations", "mappedTableContent"]),
  },
  async mounted() {
    this.getBranches();
  },
  methods: {
    ...mapActions(["getBranches", "enableBranchForReservation"]),
    ...mapMutations(["updateUIState"]),
    onOpenAddBranch() {
      this.updateUIState({
        key: UI_KEYS.IS_MODAL_OPEN,
        change: true,
      });
      this.updateUIState({
        key: UI_KEYS.MODE,
        change: "add",
      });
    },
    specificBranchClick(clickedBranch) {
      console.log(clickedBranch);
    },
    onCloseModal() {
      this.updateUIState({
        key: UI_KEYS.IS_MODAL_OPEN,
        change: false,
      });
    },
    onProccedModal() {
      this.updateUIState({
        key: UI_KEYS.IS_MODAL_OPEN,
        change: false,
      });
      this.enableBranchForReservation();
    },
  },
};
</script>

<template>
  <div class="px-12 pt-12 bg-slate-200 min-h-[92vh]">
    <div class="bg-white rounded-md shadow-md">
      <div class="flex justify-end py-4 border-b border-[#EEE] px-4">
        <DynamicButton btnStyle="secondary" @buttonClicked="onOpenAddBranch">
          Add Branch
        </DynamicButton>
      </div>

      <div>
        <BranchesTable
          :headers="[
            { label: 'Branch', value: 'branch' },
            { label: 'Reference', value: 'ref' },
            { label: 'Number of Tables', value: 'tablesCount' },
            { label: 'Reservation Duration', value: 'duration' },
          ]"
          :items="mappedTableContent"
          @onRowClicked="specificBranchClick"
        ></BranchesTable>
      </div>
    </div>
    <BasicModal
      :disabled="selectedToAddBranch === null"
      :isOpen="ui.isModalOpen"
      title="Add Branch"
      @onClose="onCloseModal"
      @onProcced="onProccedModal"
    >
      <AddBranch v-if="ui.mode === 'add'"></AddBranch>
      <EditBranch v-if="ui.mode === 'edit'"></EditBranch>
    </BasicModal>
  </div>
</template>