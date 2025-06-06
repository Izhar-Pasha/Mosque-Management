import { API } from "./saathiAPI.js";

const studentEndpoint = "/api/student";

export const getStud = async () => {
  const res = await API.get(studentEndpoint);
  return res.data;
};

export const createStud = async (data) => {
  const res = await API.post(studentEndpoint, data);
  return res.data;
};

export const updateStud = async ({ id, data }) => {
  const res = await API.put(`${studentEndpoint}/${id}`, data);
  return res.data;
};

export const deleteStud = async (id) => {
  const res = await API.delete(`${studentEndpoint}/${id}`);
  return res.data;
};
