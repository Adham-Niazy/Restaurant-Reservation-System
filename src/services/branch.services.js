import axios from "axios";

export function listBranches(withSectionsAndTables = false) {
  return axios.get("/branches", {
    params: {
      ...(withSectionsAndTables && { include: ['sections', 'sections.tables'] }),
    }
  });
}

export function enableSpecificBranchForReservation(branchId) {
  return axios.put(`/branches/${branchId}`, {
    accepts_reservations: true
  });
}