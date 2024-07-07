import { Request } from "express";

export interface userInterface {
    id: string
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