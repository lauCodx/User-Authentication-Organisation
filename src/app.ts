import express from "express"
require("dotenv").config()
import userRoute from "../src/routes/user.route"
import errorHandler from "./middlewares/error.handler";


const app = express();
const port = process.env.PORT || 5000

app.listen(port, () =>{
    console.log("App running on", port) 
})
app.use (express.json());
app.use("/auth", userRoute )
app.use(errorHandler)