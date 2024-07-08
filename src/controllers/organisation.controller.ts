import { NextFunction, Request, Response } from "express";
import Pool from "../config/db.connect";
import { URequest } from "../interfaces/user.interface";
import { v4 as uuidV4 } from "uuid";
import { createOrganisation } from "../service/org.service";
import { createUserOrg } from "../service/user.org.service";


export const getOrg = async (req:URequest, res:Response, next:NextFunction) =>{

    const userId = req.user?.id;

    try {

        const getAllOrg = await Pool.query(

            `SELECT organisations.* FROM organisations
            JOIN user_organisations ON organisations.orgId = user_organisations.org_id
            WHERE user_organisations.user_id = $1 OR organisations.orgUserId = $1`,
            [userId]
      
        )

        res.status(200).json({
            status:"success",
            message: "Fetched organisation successfully!",
            data: {
                organisations: getAllOrg
            }
        })

        
    } catch (error) {

        next(error)
        
    }
}

export const getSingleOrg = async (req:URequest, res:Response, next:NextFunction) => {

    const userId = req.user?.id;
    const {orgId} = req.params;

    try {

        const getAllOrg = await Pool.query(

            `SELECT organisations.* FROM organisations
            JOIN user_organisations ON organisations.orgId = user_organisations.org_id
            WHERE user_organisations.user_id = $1 OR organisations.orgUserId = $1`,
            [orgId, userId] 
      
        )

        if (!getAllOrg.rows[0]){
            res.status(400);
            throw new Error ("Organisation not found or access denied")
        }

        const orgData = getAllOrg.rows[0]

        res.status(200).json({
            status:"success",
            message: "Fetched organisation successfully!",
            data: {
                organisations:orgData
            }
        })

        
    } catch (error) {

        next(error)
        
    }

}

export const createOrg =   async (req:URequest, res:Response, next:NextFunction) => {
    const { name, description } = req.body
    const userId = req.user?.id

    if (!name) {
        res.status(400);
        throw new Error ("Name is required!")
    }

    try {

        const uniqueId =  uuidV4();

        const createNewOrganisation = await Pool.query(createOrganisation, [uniqueId, name, description, userId]);

        const orgId = createNewOrganisation.rows[0].orgId

        if(!createNewOrganisation.rows[0]){
            res.status(400);
            throw new Error ("Organisation was not created successfully")
        }

        await Pool.query (createUserOrg, [userId, orgId])

        const orgData = createNewOrganisation.rows[0]

        res.status(200).json({
            status:"success",
            message: "Created successfully!",
            data: {
                organisations:orgData
            }
            
        })

        
        
    } catch (error) {

        next(error)
        
    }
}

const addUserToOrg =  async (req:URequest, res:Response, next:NextFunction) =>{
    const {orgId} = req.params;
    const {userId} = req.body;

    if (userId){
        res.status(400);
        throw new Error (" UserId is required ")
    };

    try {

        const user = await Pool.query('SELECT userId FROM users WHERE userId = $1', [userId])

        if(!user.rows[0]){
            res.status(400);
            throw new Error ("User not found!")

        }

        const org = await Pool.query('SELECT orgId FROM users WHERE orgId = $1', [orgId])

        if(!org.rows[0]){
            res.status(400);
            throw new Error ("Organisation not found")
        }
        
        await Pool.query(
            'INSERT INTO users_organisations (user_id, org_id) VALUES ($1, $2)',
            [userId, orgId]
          );

          res.status(200).json({
            status: "success",
            message: "User added to organisation successfully"
          })
        
    } catch (error) {
        next(error)
        
    }
}