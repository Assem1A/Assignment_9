import { Router } from "express";
import { login, signup } from "./auth.service.js";
import { auth } from "../../middleWare/auth.MW.js";

const router=Router()
router.post('/users/signup',async(req,res,next)=>{
    const result=await signup(req.body)
    res.status(201).json({msg:"done",result})
})

router.post('/users/login',async(req,res,next)=>{
        const result=await login(req.body.email,req.body.password)
    res.status(201).json({msg:"done",result})
})
export default router