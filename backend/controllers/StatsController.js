import client from "../connections/redisClient.js";
import { AppError } from "../middlewares/errorHandler.js";
import { Professional } from "../models/professionalModel.js";
import { Saathi } from "../models/saathiModel.js";
import { Student } from "../models/studentModel.js";

class StatsOverview {
  async saathi() {
    const querySaathi = await Saathi.find();
    if (!querySaathi) {
      throw new AppError("Failed to query saathi", 400);
    }
    return querySaathi.length;
  }

  async professional() {
    const queryProfessional = await Professional.find();
    if (!queryProfessional) {
      throw new AppError("Failed to query professional", 400);
    }
    return queryProfessional.length;
  }

  async student() {
    const queryStudent = await Student.find();
    if (!queryStudent) {
      throw new AppError("Failed to query student", 400);
    }
    return queryStudent.length;
  }

  getAllCounts = async (req, res, next) => {
    try {
      const Count = await Promise.all([
        this.saathi(),
        this.professional(),
        this.student(),
      ]);

      res.status(200).json({
        saathi: Count[0],
        professional: Count[1],
        student: Count[2],
      });
    } catch (error) {
      next(error);
    }
  };
}

export const Stats = new StatsOverview();
