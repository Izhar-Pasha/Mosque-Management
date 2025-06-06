import { API } from "./saathiAPI.js";

const profEndpoint = "/api/professional";

export const getProf = async () => {
  const res = await API.get(profEndpoint);
  return res.data;
};

export const createProf = async (data) => {
  const res = await API.post(profEndpoint, data);
  return res.data;
};

export const updateProf = async ({ id, data }) => {
  const res = await API.put(`${profEndpoint}/${id}`, data);
  return res.data;
};

export const deleteProf = async (id) => {
  const res = await API.delete(`${profEndpoint}/${id}`);
  return res.data;
};
