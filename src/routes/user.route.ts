import express from "express";
import { getUsers, protectedRoute, registerUser } from "../controllers/user.controller";
import validateToken from "../middlewares/validation.token";

const route = express.Router()

route.post("/register", registerUser );
route.get("/getusers", getUsers );
route.get("/protected",validateToken, protectedRoute)


export default route;