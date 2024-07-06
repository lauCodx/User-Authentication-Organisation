import { Request, Response } from "express"
import Pool from "../config/db.connect"

export const registerUser = async (req:Request, res:Response) =>{

    res.status(200).send("We are live")
}
