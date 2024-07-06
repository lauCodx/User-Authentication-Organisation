import express from "express";
import { registerUser } from "../controllers/user.controller";

const route = express.Router()

route.get("/register", registerUser )

export default route;