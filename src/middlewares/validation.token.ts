import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import { URequest } from "../interfaces/user.interface";


const validateToken =  (req:URequest, res: Response, next:NextFunction) => {

    try {
        const authHeader = req.headers ['authorization'];

    if (!authHeader) {
        res.status(400);
        throw new Error("No authorization found!")
    }

    if (authHeader && (authHeader.startsWith("Bearer"))){
        const token = authHeader.split (" ")[1];

        if (!token){
            res.status(400).send("Invalid token")
        };

        jwt.verify(token, process.env.ACCESS_KEY!, (err:any, decoded:any) => {
            if (err){
                res.status(401).send ("Unauthorized user or token has expired")
            };
            req.user = decoded;
            next()
        })
    }
    } catch (error) {
        next(error)
    }
   
}

export default validateToken;