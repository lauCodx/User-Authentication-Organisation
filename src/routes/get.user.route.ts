import express from "express";
import { getAUser } from "../controllers/user.controller";
import validateToken from "../middlewares/validation.token";

const route = express.Router();



route.get('/:userId', validateToken, getAUser)

export default route