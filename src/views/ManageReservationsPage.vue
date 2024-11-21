<script>
import DynamicButton from "@/components/shared/DynamicButton.vue";
import AddBranch from "@/components/AddBranch.vue";
import BranchesTable from "@/components/BranchesTable.vue";
import BasicModal from "@/components/shared/BasicModal.vue";
import { listBranches } from "@/services/branch.services";
export default {
  components: {
    DynamicButton,
    BranchesTable,
    BasicModal,
    AddBranch
  },
  computed: {
    mappedTableContent() {
      return this.branches.map((branch) => {
        return {
          id: branch.id,
          ref: branch.reference,
          branch: branch.name,
          tablesCount:
            branch?.sections?.reduce((acc, section) => {
              return (
                acc +
                section.tables.filter((table) => table.accepts_reservations)
                  .length
              );
            }, 0) || 0,
          duration: `${branch.reservation_duration} Minutes`,
        };
      });
    },
  },
  data() {
    return {
      branches: [],
      isOpenAddBranch: true,
    };
  },
  async mounted() {
    try {
      const { data: branches } = await listBranches(true);
      this.branches = branches.filter((branch) => branch.accepts_reservations);
      console.log(this.branches);
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    onCloseAddBranch() {},
  },
};
</script>

<template>
  <div class="px-12 pt-12 bg-slate-200 min-h-[92vh]">
    <div class="bg-white rounded-md shadow-md">
      <div class="flex justify-end py-4 border-b border-[#EEE] px-4">
        <DynamicButton btnStyle="secondary" @buttonClicked="isOpenAddBranch = true"> Add Branch </DynamicButton>
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
      :isOpen="isOpenAddBranch"
      title="Add Branch"
      @onClose="isOpenAddBranch = false"
    >
    <AddBranch></AddBranch>
  </BasicModal>
  </div>
</template>