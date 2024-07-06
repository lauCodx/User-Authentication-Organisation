import { NextFunction, Request, Response } from "express";
import Pool from "../config/db.connect";
import {
  checkIfUserExist,
  createUser,
  getAllUser,
} from "../service/user.service";
import bcrypt from "bcryptjs"


// @des Register User
// @route POST /api/auth/register
// @access Public
export const registerUser = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    if (!firstName || !lastName || !email || !password ) {
      res.status(422);
      throw new Error("All field are required!");
    }

    const checkUser = await Pool.query(checkIfUserExist, [email]);

    if (checkUser.rows[0]){
        res.status (422);
        throw new Error ("User already exist!")
    };

    // Hashed my password
    const hashPassword = await bcrypt.hash (password, 10);

    // Created new User
    const user = await Pool.query(createUser,  [firstName, lastName, email, hashPassword, phone]);
    if (user){
        res.status (201).json({
            status :"success",
            message: "Registration Successful!",
            data: user.rows
        })

    } else {
        res.status(400);
        throw new Error("User was not registered successfully!")
    }

  } catch (error) {
        next(error);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await Pool.query(getAllUser);

    if (!user) {
      res.status(400);
      throw new Error("Error getting all the users");
    }
    res.status(200).json({
      status: true,
      message: "Users gotten successfully!",
      data: user.rows,
    });
  } catch (error) {
    console.log(error);
  }
};
