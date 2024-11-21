import axios from "axios";

export function listBranches(withSectionsAndTables = false) {
  return axios.get("/branches", {
    params: {
      ...(withSectionsAndTables && { include: ['sections', 'sections.tables'] }),
    }
  });
}