import { API } from "./saathiAPI.js";

const profEndpoint = "/api/professional";

// GET REQ: GET ALL PROFESSIONAL
export const getProf = async () => {
  try {
    const res = await API.get(profEndpoint);
    return res.data.allProfessional;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// POST REQ: CREATE THE PROFESSIONAL
export const createProf = async (data) => {
  try {
    const res = await API.post(profEndpoint, data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// PUT REQ: UPDATE THE PROFESSIONAL
export const updateProf = async (id, data) => {
  try {
    const res = await API.put(`${profEndpoint}/${id}`, data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// DELETE REQ: DELETE THE PROFESSIONAL
export const deleteProf = async (id) => {
  try {
    console.log("DELETE FUNC GOT:", id, typeof id);
    // console.log("DELETE FUNC GOT:", id);

    const res = await API.delete(`${profEndpoint}/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
