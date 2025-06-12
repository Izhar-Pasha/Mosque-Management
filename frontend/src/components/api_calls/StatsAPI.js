import { API } from "./saathiAPI.js";

// GET REQ:  TO GET THE COUNT FOR STATISTICS
export const statistics = async () => {
  try {
    const res = await API.get("/stats");
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
