import jwt from "jsonwebtoken";
import { JWT_PRIVATE } from "../config/veriables.js";
import { findUserById } from "../repositories/user.repo.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies["livepoll-access-token"];
    if (!token) {
      throw {
        statusCode: 401,
        message: "No token provided",
      };
    }

    const decodedData = jwt.verify(token, JWT_PRIVATE);
    const userid = decodedData.id;
    const user = await findUserById(userid);

    if (!user) {
      throw {
        statusCode: 401,
        message: "Invalid token",
      };
    }
    req.user = user;
    next();
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid token",
        err: err.message,
      });

      console.log(err);
    }
  }
};
