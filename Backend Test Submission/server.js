import express from "express"
import connectDB from "./config/mongo.config.js";
import { loggingMiddleware } from "./LoggingMiddleware/index.js"; 
import urlRoutes from "./routes/urlRoutes.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.use(loggingMiddleware);

app.use("/shorturls", urlRoutes);


app.listen(PORT , ()=>{
    connectDB();
    console.log("running on port : ${PORT}");
})