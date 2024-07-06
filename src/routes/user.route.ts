import express from "express";
import { getUsers, registerUser } from "../controllers/user.controller";

const route = express.Router()

route.post("/register", registerUser );
route.get("/getusers", getUsers );


export default route;