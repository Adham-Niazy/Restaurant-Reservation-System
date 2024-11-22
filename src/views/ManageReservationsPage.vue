<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import DynamicButton from "@/components/shared/DynamicButton.vue";
import AddBranch from "@/components/AddBranch.vue";
import EditBranch from "@/components/EditBranch.vue";
import BranchesTable from "@/components/BranchesTable.vue";
import BasicModal from "@/components/shared/BasicModal.vue";
import { STATE_KEYS, UI_KEYS } from "@/store/state_keys";
export default {
  data() {
    return {
      branchName: "",
      isLoadingBranches: true,
      isLoadingModal: false,
    };
  },
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
    this.isLoadingBranches = true;
    try {
      await this.getBranches();
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoadingBranches = false;
    }
  },
  methods: {
    ...mapActions([
      "getBranches",
      "enableBranchForReservation",
      "editSpecificBranch",
      "resetStateVariables"
    ]),
    ...mapMutations(["updateUIState", "updateState"]),
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
      this.branchName = clickedBranch.branch;
      this.updateUIState({
        key: UI_KEYS.IS_MODAL_OPEN,
        change: true,
      });
      this.updateUIState({
        key: UI_KEYS.MODE,
        change: "edit",
      });
      this.updateState({
        key: STATE_KEYS.SELECTED_TO_EDIT_BRANCH,
        change: clickedBranch.id,
      });
    },
    onCloseModal() {
      this.resetStateVariables();
    },
    async onProccedModal() {
      this.isLoadingModal = true;
      try {
        if (this.ui[UI_KEYS.MODE] === "add") {
          await this.enableBranchForReservation();
        } else {
          await this.editSpecificBranch();
        }
        this.updateUIState({
          key: UI_KEYS.IS_MODAL_OPEN,
          change: false,
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoadingModal = false;
      }
    },
  },
};
</script>

<template>
  <div class="px-12 pt-12">
    <div class="bg-white rounded-md shadow-md overflow-hidden">
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
          :loading="isLoadingBranches"
          @onRowClicked="specificBranchClick"
        ></BranchesTable>
      </div>
    </div>
    <BasicModal
      :isOpen="ui.isModalOpen"
      :title="
        ui.mode === 'add'
          ? 'Add Branch'
          : `Edit ${branchName} reservation settings`
      "
      :loading="isLoadingModal"
      @onClose="onCloseModal"
      @onProcced="onProccedModal"
    >
      <AddBranch v-if="ui.mode === 'add'"></AddBranch>
      <EditBranch v-if="ui.mode === 'edit'"></EditBranch>
    </BasicModal>
  </div>
</template>