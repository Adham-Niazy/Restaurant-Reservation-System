<script>
import SelectInput from '@/components/shared/SelectInput.vue';
import { listBranches } from '@/services/branch.services';
export default {
  data() {
    return {
      branches: [],
      selectedBranchId: ''
    }
  },
  components: {
    SelectInput
  },
  async mounted() {
    try {
      const { data: branches } = await listBranches(true);
      this.branches = branches.filter((branch) => !branch.accepts_reservations);
    } catch (e) {
      console.log(e);
    }
  },
  computed: {
    mappedOptions() {
      return this.branches.map((branch) => {
        return {
          label: `${branch.name} - ${branch.reference}`,
          value: branch.id
        };
      });
    },
  },
  methods: {
    onSelectBranch(change) {
      console.log(change)
    }
  }
}
</script>

<template>
  <SelectInput
    inputId="disabledReservationBranches"
    label="Branches"
    placeholder="Select Branch"
    :options="mappedOptions"
    @onSelet="onSelectBranch"></SelectInput>
</template>