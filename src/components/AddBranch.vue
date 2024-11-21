<script>
import SelectInput from '@/components/shared/SelectInput.vue';
import { mapGetters, mapMutations } from 'vuex';
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
  computed: {
    ...mapGetters(['getDisabledBranchesForReservations']),
    mappedOptions() {
      return this.getDisabledBranchesForReservations.map((branch) => {
        return {
          label: `${branch.name} - ${branch.reference}`,
          value: branch.id
        };
      });
    },
  },
  methods: {
    ...mapMutations(['updateSelectedToAddBranch']),
    onSelectBranch(change) {
      this.updateSelectedToAddBranch(change);
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