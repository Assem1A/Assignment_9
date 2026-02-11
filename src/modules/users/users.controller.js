import { Router } from "express";
import { auth } from "../../middleWare/auth.MW.js";
import { delete12, edit, gets } from "./users.service.js";

const router=Router()
router.patch('/users',auth,async(req,res,next)=>{
    const result=await edit(req.user,req.body)
    res.status(200).json({msg:"done",result})
})
router.delete('/users',auth,async(req,res,next)=>{
        const result=await delete12(req.user._id)
    res.status(200).json({msg:"done",result})
})
router.get('/users',auth,async(req,res,next)=>{
        const result=await gets(req.user._id)
    res.status(200).json({msg:"done",result})
})
export default router