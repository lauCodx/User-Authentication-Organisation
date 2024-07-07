import { NextFunction, Request, Response } from "express";
import Pool from "../config/db.connect";
import {
  checkIfUserExist,
  createUser,
  getAllUser,
  getUserById,
} from "../service/user.service";
import bcrypt from "bcryptjs";
import { v4 as uuidV4 } from "uuid";
import { URequest, userInterface } from "../interfaces/user.interface";
import jwt from "jsonwebtoken";
import { createOrganisation } from "../service/org.service";
import { createUserOrg } from "../service/user.org.service";

// @des Register User
// @route POST /api/auth/register
// @access Public
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    if (!firstName || !lastName || !email || !password) {
      res.status(422);
      throw new Error("All field are required!");
    }

    const checkUser = await Pool.query(checkIfUserExist, [email]);

    if (checkUser.rows[0]) {
      res.status(422);
      throw new Error("User already exist!");
    }

    // Generating a unique ID
    const uniqueId = uuidV4();

    // Hashed my password
    const hashPassword = await bcrypt.hash(password, 10);

    // Created new User
    const user = await Pool.query(createUser, [
      uniqueId,
      firstName,
      lastName,
      email,
      hashPassword,
      phone,
    ]);

    const userId = user.rows[0].userId;

    const description = 'This is the first organisation to be created with this user '
    const orgName = `${firstName}'s Organisation`

    const organisation = await Pool.query (createOrganisation, [
        uniqueId,
        orgName,
        description,
        userId
    ])

    const orgId = organisation.rows[0].orgId

    await Pool.query (createUserOrg, [userId, orgId])

    if (user) {
      res.status(201).json({
        status: "success",
        message: "Registration Successful!",
        data: user.rows,
      });
    } else {
      res.status(400);
      throw new Error("Registration unsuccessfull");
    }
  } catch (error) {
    next(error);
  }
};

// @des Login User
// @route POST /api/auth/login
// @access Public
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

export const getAUser = async (req:Request, res: Response, next:NextFunction) =>{
    const { userId } = req.params;

    try {
        const users = await Pool.query(getUserById, [userId])  
    
        if (!users.rows[0]){
            res.status(400);
            throw new Error ("User not found!")
        }
        const user = users.rows[0]
        res.status(200). json({
            status: "success",
            message: "User was fetched successfully",
            data: {
                user:{
                    userId: user.userid,
                    firstName: user.firstname,
                    lastNmae: user.lastname,
                    email: user.email,
                    phone: user.phone,
                }
            }
        })
        
    } catch (error) {
        next(error)
    }

}

// @des Register User
// @route POST /api/auth/register
// @access Public

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }

    // Checking if user exist!
    const checkUser = await Pool.query(checkIfUserExist, [email]);

    if (!checkUser.rows[0]) {
      res.status(400);
      throw new Error("User does not exist!");
    }

    const user = checkUser.rows[0];

    console.log(user);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          id: user.userid,
          email: user.email,
        },
        process.env.ACCESS_TOKEN!,
        { expiresIn: "1d" }
      );

      res.status(400).json({
        status: "success",
        message: "Login successful",
        data: {
          accessToken: token,
          user: {
            userId: user.userid,
            firstName: user.firstname,
            lastNmae: user.lastname,
            email: user.email,
            phone: user.phone,
          },
        },
      });
    } else {
      res.status(401);
      throw new Error("Login unsuccessful!");
    }
  } catch (error) {
    next(error);
  }
};

// @desc Protected route
// @route POST /api/auth/protected
// @access Private
export const protectedRoute = async (req: URequest, res: Response) => {
  res.status(200).json(req.user);
};
