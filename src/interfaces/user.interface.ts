import { Request } from "express";

export interface userInterface {
    userId : string;
    firstName : string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
}


export interface URequest extends Request {
    user? : userInterface;
}