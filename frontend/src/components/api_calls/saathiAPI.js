import axios from "axios";

export const API = axios.create({
  baseURL: "https://mosque-management-qb7s.onrender.com",
  withCredentials: true,
});

const saathiEndpoint = "/api/saathi";

// GET REQ: GET ALL SAATHI
export const getSaathi = async () => {
  try {
    const res = await API.get(saathiEndpoint);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// POST REQ: CREATE THE SAATHI
export const createSaathi = async (data) => {
  try {
    const res = await API.post(saathiEndpoint, data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// PUT REQ: UPDATE THE SAATHI
export const updateSaathi = async ({ id, data }) => {
  try {
    const res = await API.put(`${saathiEndpoint}/${id}`, data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// DELETE REQ: DELETE THE SAATHI
export const deleteSaathi = async (id) => {
  try {
    const res = await API.delete(`${saathiEndpoint}/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
