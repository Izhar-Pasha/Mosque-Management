import {
  createProf,
  getProf,
  updateProf,
  deleteProf,
} from "../components/api_calls/professionalAPI.js";
import {
  createSaathi,
  getSaathi,
  updateSaathi,
  deleteSaathi,
} from "../components/api_calls/saathiAPI.js";
import {
  createStud,
  getStud,
  updateStud,
  deleteStud,
} from "../components/api_calls/studentAPI.js";

export const API_Map = {
  Saathi: {
    create: createSaathi,
    get: getSaathi,
    update: updateSaathi,
    delete: deleteSaathi,
  },

  Student: {
    create: createStud,
    get: getStud,
    update: updateStud,
    delete: deleteStud,
  },

  Professional: {
    create: createProf,
    get: getProf,
    update: updateProf,
    delete: deleteProf,
  },
};

export const QueryKeys = {
  saathiKey: "Saathi",
  professionalKey: "Professional",
  studentKey: "Student",
};
