import { API } from "./saathiAPI.js";

export const login = async (data) => {
  const res = await API.post("/login", data);
  return res;
};

export const logout = async () => {
  const res = await API.post("/logout");
  return res;
};
