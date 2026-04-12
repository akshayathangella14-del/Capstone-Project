import exp from "express";
import { verifyToken } from "../middlewares/VerifyToken.js"
import {UserModel} from '../models/UserModel.js'
export const adminApp = exp.Router();

//Read all users and authors
adminApp.get("/users", verifyToken("ADMIN"), async (req, res) => {
  const adminId = req.user?.id;
  //find user by id
  const admin = await UserModel.findById(adminId);
  //if user not found
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }
  //read all users form db
  let usersList = await UserModel.find();
  //send res
  res.status(200).json({ message: "users", payload: usersList });
});


