import express from "express"
require("dotenv").config()
import userRoute from "../src/routes/user.route"
import errorHandler from "./middlewares/error.handler";
import bodyParser from "body-parser"
import createTable from "./migrations/create.tables";


const app = express();
const port = process.env.PORT || 5000

app.listen(port, () =>{
    console.log("App running on", port) 
})

app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}))


createTable()
app.use (express.json());
app.use("/auth", userRoute )
app.use(errorHandler)