import { API } from "./saathiAPI.js";

// POST REQ: USER LOGIN
export const login = async (data) => {
  try {
    const res = await API.post("/login", data);
    return res;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// POST REQ: USER LOGOUT
export const logout = async () => {
  try {
    const res = await API.post("/logout");
    return res;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
