import { Router } from "express";
import { auth } from "../../middleWare/auth.MW.js";
import { addNote, deleteAllNotes, deleteNote, getAllNotes, getNote, getNote2, getNotesAndUserInfo, replaceNote, searchNotes, updateAllNotes, updateNote } from "./notes.service.js";

const router=Router()

router.post('/',auth,async(req,res,next)=>{
    const result=await addNote(req.body,req.user._id)
    res.status(201).json({msg:"done",result})
})
router.patch('/:noteID',auth,async(req,res,next)=>{
    const result=await updateNote(req.body,req.user._id,req.params.noteID)
    res.status(200).json({msg:"done",result})
})


router.put('/replace/:noteID',auth,async(req,res,next)=>{
    const result=await replaceNote(req.body,req.user._id,req.params.noteID)
    res.status(200).json({msg:"done",result})
})
router.patch('/all/all',auth,async(req,res,next)=>{
    const result=await updateAllNotes(req.body.title,req.user._id)
    res.status(200).json({msg:"done",result})
})

router.delete('/:noteID',auth,async(req,res,next)=>{
    const result=await deleteNote(req.user._id,req.params.noteID)
    res.status(200).json({msg:"done",result})
})
router.get('/paginate-sort',auth,async(req,res,next)=>{
     const result=await getAllNotes(req.user._id,req.query.page,req.query.limit)
    res.status(200).json({msg:"done",result})
})

router.get('/noteByContent/:content',auth,async(req,res,next)=>{
     const result=await getNote2(req.user._id,req.params.content)
    res.status(200).json({msg:"done",result})
})
router.get('/all/',auth,async(req,res,next)=>{
     const result=await getNotesAndUserInfo(req.user._id)
    res.status(200).json({msg:"done",result})
})
router.get('/aggregate/{:title}',auth,async(req,res,next)=>{
     const result=await searchNotes(req.user._id,req.params.title)
    res.status(200).json({msg:"done",result})
})
router.delete('deleteAllNotesForUser',auth,async(req,res,next)=>{
        const result=await deleteAllNotes(req.user._id)
    res.status(200).json({msg:"done",result})
})

export default router