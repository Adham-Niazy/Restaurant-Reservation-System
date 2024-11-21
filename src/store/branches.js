import Vue from 'vue';
import Vuex from 'vuex';
import { enableBranchForReservation, listBranches } from '@/services/branch.services';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    branches: [],
    selectedToAddBranch: null
  },
  mutations: {
    updateBranches(state, branches) {
      state.branches = branches;
    },
    updateSelectedToAddBranch(state, branchId) {
      state.selectedToAddBranch = branchId;
    }
  },
  actions: {
    async getBranches({ commit }) {
      try {
        const { data: branches } = await listBranches(true);
        commit('updateBranches', branches);
      } catch (e) {
        console.log(e);
      }
    },
    async enableBranchForReservation({ commit }) {
      try {
        await enableBranchForReservation(this.state.selectedToAddBranch);
        const { data: branches } = await listBranches(true);
        commit('updateBranches', branches);
        commit('updateSelectedToAddBranch', null);
      } catch (e) {
        console.log(e);
      }
    }
  },
  getters: {
    getEnabledBranchesForReservations: state => {
      return state.branches.filter((branch) => branch.accepts_reservations);
    },
    getDisabledBranchesForReservations: state => {
      return state.branches.filter((branch) => !branch.accepts_reservations);
    },
    mappedTableContent: (_, getters) => {
      return getters.getEnabledBranchesForReservations?.map((branch) => {
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
    }
  }
});