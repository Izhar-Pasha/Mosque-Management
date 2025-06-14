import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import { AppError } from "./errorHandler.js";

export const register = async (req, res, next) => {
  try {
    // const password = "FirstCalipha";
    const password = "RahziPasha";

    const hashedPassword = await bcrypt.hash(password, 10);
    const fixedUser = new User({
      // userName: "Admin@Abu",
      userName: "IzharPasha",
      password: hashedPassword,
    });
    if (!fixedUser) {
      throw new AppError("Unable to create admin", 404);
    }

    await fixedUser.save();

    res.status(201).json({ message: "Admin is created" });
  } catch (error) {
    next(error);
  }
};

// export const getAdmin = async (req, res, next) => {
//   try {
//     const allUsers = await User.find();
//     if (!allUsers) {
//       throw new AppError("failed to get all users", 400);
//     }
//     res.status(200).json({ allUsers, message: "Successfully got the admins" });
//   } catch (error) {
//     next(error);
//   }
// };

export const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      throw new AppError("All fields are requried", 404);
    }

    const validAdmin = await User.findOne({ userName });

    if (!validAdmin) {
      throw new AppError("Admin not found", 404);
    }
    const isMatch = await bcrypt.compare(password, validAdmin.password);

    if (!isMatch) {
      throw new AppError("Password did not match", 404);
    }

    const payload = {
      id: validAdmin._id,
      name: validAdmin.userName,
    };

    const secret = process.env.SECRET;

    const options = {
      expiresIn: "20min",
    };

    const token = jwt.sign(payload, secret, options);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 20 * 60 * 1000, //20 mins
    });

    return res.status(200).json({ message: "Login Successfull" });
  } catch (error) {
    next(error);
  }
};

export const Authentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new AppError("Token is missing", 401);
    }

    const secret = process.env.SECRET;

    const verifyToken = jwt.verify(token, secret);

    if (!verifyToken) {
      throw new AppError("Token not match", 400);
    }

    req.User = verifyToken;
    next();
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  res.status(200).json({ message: "User successfully logout" });
};
