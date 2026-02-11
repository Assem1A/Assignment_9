import { hash } from "bcrypt";
import { userModel } from "../../DB/models/userModel.js"
import { SALT_ROUND } from "../../../config/config.js";
import { noteModel } from "../../DB/models/noteModel.js";
import { deleteAllNotes } from "../notes/notes.service.js";

export const edit=async(user,body)=>{
    
    const {email,name,age,phone}=body
    if(email){
        const exist=await userModel.findOne({email})
    
        
   if (exist && exist._id.toString() !== user._id.toString())
 throw new Error("dublicated", { cause: { status: 409 } })
    }
    const hashedPhone=await hash(phone,+(SALT_ROUND))
    const updatedUser=await userModel.updateOne(
  { _id: user._id },
  { email, name, age, phone:hashedPhone }
);


    return updatedUser
}
export const delete12=async(id)=>{

    const user=await userModel.findOneAndDelete({_id:id})
    deleteAllNotes(id)
    return user


}
export const gets=async(id)=>{
    const user=await userModel.findOne({_id:id})
    return user

}