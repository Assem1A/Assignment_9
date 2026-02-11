import mongoose from "mongoose"
import { DB_URI } from "../../config/config.js"

export const connectDB = async () => {
    try{
        await mongoose.connect(DB_URI)
        console.log("kkaajjaa");
        
    }


    catch(error){
        console.log("Error while connecting to DB", error)
    }
}