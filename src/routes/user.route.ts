import express from "express";
import { getAUser, getUsers, loginUser, protectedRoute, registerUser } from "../controllers/user.controller";
import validateToken from "../middlewares/validation.token";

const route = express.Router()

route.post("/register", registerUser );
route.post("/login", loginUser );
route.get("/getusers", getUsers );
route.get("/protected",validateToken, protectedRoute)


export default route;