import express from "express";
import validateToken from "../middlewares/validation.token";
import { createOrg, getOrg, getSingleOrg } from "../controllers/organisation.controller";


const route = express.Router();
route.use(validateToken)

route.get("/", getOrg ) 
route.post("/", createOrg ) 
route.get("/:orgId" , getSingleOrg)
route.get("/:orgId/users" )


export default route;