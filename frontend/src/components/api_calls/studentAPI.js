import { API } from "./saathiAPI.js";

const studentEndpoint = "/api/student";

// GET REQ: GET ALL STUDENT
export const getStud = async () => {
  try {
    const res = await API.get(studentEndpoint);
    console.log(res.data.allStudents);

    return res.data.allStudents;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// POST REQ: CREATE THE STUDENT
export const createStud = async (data) => {
  try {
    const res = await API.post(studentEndpoint, data);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// PUT REQ: UPDATE THE STUDENT
export const updateStud = async ({ id, data }) => {
  try {
    const res = await API.put(`${studentEndpoint}/${id}`, data);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// DELETE REQ: DELETE THE STUDENT
export const deleteStud = async (id) => {
  try {
    const res = await API.delete(`${studentEndpoint}/${id}`);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
