import Vue from 'vue';
import Vuex from 'vuex';
import { enableSpecificBranchForReservation, listBranches } from '@/services/branch.services';
import { STATE_KEYS } from './state_keys';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    branches: [],
    selectedToAddBranch: null,
    selectedToEditBranch: null,
    ui: {
      mode: 'add',
      isModalOpen: false
    }
  },
  mutations: {
    updateState(state, { key, change }) {
      state[key] = change;
    },
    updateUIState(state, { key, change }) {
      state.ui[key] = change;
    }
  },
  actions: {
    async getBranches({ commit }) {
      try {
        const { data: branches } = await listBranches(true);
        commit('updateState', {
          key: STATE_KEYS.BRANCHES,
          change: branches
        });
      } catch (e) {
        console.log(e);
      }
    },
    async enableBranchForReservation({ commit }) {
      try {
        await enableSpecificBranchForReservation(this.state.selectedToAddBranch);
        const { data: branches } = await listBranches(true);
        commit('updateState', {
          key: STATE_KEYS.BRANCHES,
          change: branches
        });
        commit('updateState', {
          key: STATE_KEYS.SELECTED_TO_ADD_BRANCH,
          change: null
        });
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