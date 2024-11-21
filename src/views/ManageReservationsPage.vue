<script>
import { mapActions, mapGetters, mapState } from "vuex";
import DynamicButton from "@/components/shared/DynamicButton.vue";
import AddBranch from "@/components/AddBranch.vue";
import BranchesTable from "@/components/BranchesTable.vue";
import BasicModal from "@/components/shared/BasicModal.vue";
export default {
  components: {
    DynamicButton,
    BranchesTable,
    BasicModal,
    AddBranch,
  },
  computed: {
    ...mapState(['selectedToAddBranch']),
    ...mapGetters([
      'getEnabledBranchesForReservations',
      'mappedTableContent'
    ]),
  },
  data() {
    return {
      isOpenAddBranch: false,
    };
  },
  async mounted() {
    this.getBranches();
  },
  methods: {
    ...mapActions([
      'getBranches',
      'enableBranchForReservation'
    ]),
    onCloseAddBranch() {
      this.isOpenAddBranch = false;
    },
    onProccedAddBranch() {
      this.isOpenAddBranch = false;
      this.enableBranchForReservation();
    },
  },
};
</script>

<template>
  <div class="px-12 pt-12 bg-slate-200 min-h-[92vh]">
    <div class="bg-white rounded-md shadow-md">
      <div class="flex justify-end py-4 border-b border-[#EEE] px-4">
        <DynamicButton
          btnStyle="secondary"
          @buttonClicked="isOpenAddBranch = true"
        >
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
        ></BranchesTable>
      </div>
    </div>
    <BasicModal
      :disabled="selectedToAddBranch === null"
      :isOpen="isOpenAddBranch"
      title="Add Branch"
      @onClose="onCloseAddBranch"
      @onProcced="onProccedAddBranch"
    >
      <AddBranch></AddBranch>
    </BasicModal>
  </div>
</template>