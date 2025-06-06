import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3002",
});

const saathiEndpoint = "/api/saathi";

export const getSaathi = async () => {
  try {
    const res = await API.get(saathiEndpoint);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const createSaathi = async (data) => {
  const res = await API.post(saathiEndpoint, data);
  return res.data;
};

export const updateSaathi = async ({ id, data }) => {
  const res = await API.put(`${saathiEndpoint}/${id}`, data);
  return res.data;
};

export const deleteSaathi = async (id) => {
  const res = await API.delete(`${saathiEndpoint}/${id}`);
  return res.data;
};
