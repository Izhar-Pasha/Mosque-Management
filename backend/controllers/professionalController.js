import client from "../connections/redisClient.js";
import { AppError } from "../middlewares/errorHandler.js";
import { Professional } from "../models/professionalModel.js";

export const createProfessional = async (req, res, next) => {
  try {
    const { name, role, company, contact, landmark, waqt } = req.body;

    if (!name || !role || !company || !contact || !landmark || !waqt) {
      throw new AppError("All fields are required", 400);
    }

    const newProfessional = new Professional({
      name,
      role,
      company,
      contact,
      landmark,
    });

    if (!newProfessional) {
      throw new AppError("Failed to add professional", 400);
    }

    await newProfessional.save();
    res.status(201).json({ message: "New Professional added" });
  } catch (error) {
    next(error);
  }
};

export const getProfessional = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skips = (page - 1) * limit;

    const cacheKey = `AllProf:page=${page}&limit=${limit}`;
    const cachedProfessional = await client.get(cacheKey);

    if (cachedProfessional) {
      console.log("Data is from redis");
      return res.status(200).json({
        allProfessional: JSON.parse(cachedProfessional),
        message: "Successfully fetched professional from (cache)",
      });
    }

    const allProfessional = await Professional.find().skip(skips).limit(limit);

    if (!allProfessional) {
      throw new AppError("Failed to get professional", 400);
    }

    await client.set(cacheKey, JSON.stringify(allProfessional), "EX", 10);

    console.log("Data if from DB");
    res
      .status(200)
      .json({ allProfessional, message: "Successfully fetched professional" });
  } catch (error) {
    next(error);
  }
};

export const searchProfessional = async (req, res, next) => {
  try {
    const { search } = req.query;

    const cacheKey = `professional:${search}`;
    const cachedProfessional = await client.get(cacheKey);

    if (cachedProfessional) {
      console.log("Data from redis cache");
      return res.json(JSON.parse(cachedProfessional));
    }

    const professional = await Professional.find({
      $or: [{ name: { $regex: search, $options: "i" } }],
    });

    if (!professional) {
      throw new AppError("Failed to get professional", 400);
    }

    await client.set(cacheKey, JSON.stringify(professional), "EX", 10);

    console.log("Data from DB");
    res.status(200).json(professional);
  } catch (error) {
    next(error);
  }
};

export const updateProfessional = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, role, company, contact, landmark, waqt } = req.body;

    const Update = await Professional.findByIdAndUpdate(
      id,
      {
        name,
        role,
        company,
        contact,
        landmark,
        waqt,
      },
      { new: true }
    );

    if (!Update) {
      throw new AppError("Failed to update professional", 400);
    }

    res.status(200).json({ message: "Successfully Updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteProfessional = async (req, res, next) => {
  try {
    const { id } = req.params;

    // console.log("data from frontend:", id);

    const Delete = await Professional.findByIdAndDelete(id);

    if (!Delete) {
      throw new AppError("Failed to Delete");
    }

    res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    next(error);
  }
};
