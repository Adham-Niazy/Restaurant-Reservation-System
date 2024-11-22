import axios from "axios";

export function listBranches(withSectionsAndTables = false) {
  return axios.get("/branches", {
    params: {
      ...(withSectionsAndTables && { include: ['sections', 'sections.tables'] }),
    }
  });
}

export function getBranchDetails(branchId) {
  return axios.get(`/branches/${branchId}`);
}

export function editBranch(branchId, data) {
  return axios.put(`/branches/${branchId}`,
    data
  );
}