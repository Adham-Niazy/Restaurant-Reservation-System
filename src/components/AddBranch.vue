<script>
import SelectInput from '@/components/shared/SelectInput.vue';
import { mapGetters, mapMutations } from 'vuex';
import { STATE_KEYS } from '@/store/state_keys';
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
    ...mapMutations(['updateState']),
    onSelectBranch(change) {
      this.updateState({
        key: STATE_KEYS.SELECTED_TO_ADD_BRANCH,
        change
      });
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