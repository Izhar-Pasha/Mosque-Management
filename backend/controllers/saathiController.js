import client from "../connections/redisClient.js";
import { AppError } from "../middlewares/errorHandler.js";
import { Saathi } from "../models/saathiModel.js";

export const createSaathi = async (req, res, next) => {
  try {
    const { name, work, contact, landmark, waqt } = req.body;

    if (!name || !work || !contact || !landmark || !waqt) {
      throw new AppError("All fields are required", 400);
    }

    const newSaathi = new Saathi({ name, work, contact, landmark, waqt });
    if (!newSaathi) {
      throw new AppError("Unable to add saathi", 400);
    }

    await newSaathi.save();
    res.status(201).json({ message: "New saathi is added" });
  } catch (error) {
    next(error);
  }
};

export const getSaathi = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skips = (page - 1) * limit;

    const allSaathi = await Saathi.find().skip(skips).limit(limit);

    if (!allSaathi) {
      throw new AppError("Failed to get saathi", 400);
    }

    res.status(200).json({ allSaathi, message: "Successfully fetched saathi" });
  } catch (error) {
    console.error(error);

    next(error);
  }
};

export const searchSaathi = async (req, res, next) => {
  try {
    const { search } = req.query;

    const cacheKey = `saathi:${search}`;
    const cachedSaathi = await client.get(cacheKey);

    if (cachedSaathi) {
      console.log("Data from redis cache");
      return res.json(JSON.parse(cachedSaathi));
    }

    const saathi = await Saathi.find({
      $or: [{ name: { $regex: search, $options: "i" } }],
    });

    if (!saathi) {
      throw new AppError("Failed to get saathi", 400);
    }

    await client.set(cacheKey, JSON.stringify(saathi), { EX: 600 });

    console.log("Data from DB");
    res.status(200).json(saathi);
  } catch (error) {
    next(error);
  }
};

export const updateSaathi = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, work, contact, landmark, waqt } = req.body;

    const Update = await Saathi.findByIdAndUpdate(
      id,
      { name, work, contact, landmark, waqt },
      { new: true }
    );

    if (!Update) {
      throw new AppError("Failed to update", 400);
    }

    res.status(200).json({ message: "Saathi is updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteSaathi = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Delete = await Saathi.findByIdAndDelete(id);

    if (!Delete) {
      throw new AppError("Failed to delete", 400);
    }

    res.status(200).json({ message: "Saathi is Deleted" });
  } catch (error) {
    next(error);
  }
};
