import client from "../connections/redisClient.js";
import { AppError } from "../middlewares/errorHandler.js";
import { Student } from "../models/studentModel.js";

export const createStudent = async (req, res, next) => {
  try {
    const { name, year, branch, collegeName, contact, landmark, waqt } =
      req.body;

    if (
      !name ||
      !year ||
      !branch ||
      !collegeName ||
      !contact ||
      !landmark ||
      !waqt
    ) {
      throw new AppError("All fields are required", 400);
    }

    const newStudent = new Student({
      name,
      year,
      branch,
      collegeName,
      contact,
      landmark,
      waqt,
    });

    if (!newStudent) {
      throw new AppError("Failed to add student", 400);
    }

    await newStudent.save();

    res.status(201).json({ message: "New Student is added" });
  } catch (error) {
    next(error);
  }
};

export const getStudents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skips = (page - 1) * limit;

    const cacheKey = `Student:page=${page}&limit=${limit}`;
    const cachedStudent = await client.get(cacheKey);

    if (cachedStudent) {
      console.log("Data is from redis");
      return res.status(200).json({
        allStudents: JSON.parse(cachedStudent),
        message: "Successfully fetched student (from cache)",
      });
    }

    const allStudents = await Student.find().skip(skips).limit(limit);
    if (!allStudents) {
      throw new AppError("Failed to get all students", 400);
    }

    await client.set(cacheKey, JSON.stringify(allStudents), "EX", 10);

    console.log("Data is from DB");
    res.status(200).json({ allStudents, message: "Fetched Successfully" });
  } catch (error) {
    next(error);
  }
};

export const searchStudent = async (req, res, next) => {
  try {
    const { search } = req.query;

    const cacheKey = `student:${search}`;
    const cachedStudent = await client.get(cacheKey);

    if (cachedStudent) {
      console.log("Data from redis cache");
      res.json(JSON.parse(cachedStudent));
    }

    const student = await Student.find({
      $or: [{ name: { $regex: search, $options: "i" } }],
    });

    if (!student) {
      throw new AppError("Failed to get  students", 400);
    }

    await client.set(cacheKey, JSON.stringify(student), { EX: 600 });

    console.log("Data from DB");
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, year, branch, collegeName, contact, landmark, waqt } =
      req.body;

    const Update = await Student.findByIdAndUpdate(
      id,
      {
        name,
        year,
        branch,
        collegeName,
        contact,
        landmark,
        waqt,
      },
      {
        new: true,
      }
    );

    if (!Update) {
      throw new AppError("Failed to update student", 400);
    }

    res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Delete = await Student.findByIdAndDelete(id);

    if (!Delete) {
      throw new AppError("Failed to delete student", 400);
    }

    res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    next(error);
  }
};
