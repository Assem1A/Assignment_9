import mongoose from "mongoose"
import { noteModel } from "../../DB/models/noteModel.js"
import { userModel } from "../../DB/models/userModel.js"

export const addNote = async (note, userID) => {
    const exist = await userModel.findById(userID)

    if (!exist) throw new Error("user not found", { cause: { status: 404 } })
    const { title, content } = note
    const addedNote = await noteModel.create({ title, content, userID })
    return addedNote


}
export const updateNote = async (note, userID, noteID) => {



    const myNote = await noteModel.findById(noteID)

    if (!myNote) throw new Error("note not found", { cause: { status: 404 } })

    if (myNote.userID.toString() !== userID.toString()) throw new Error("you are mot allowed to do this action", { cause: { status: 403 } })
    const updatedNote = await noteModel.updateOne({ _id: noteID }, { title: note.title, content: note.content })
    return updatedNote
}
export const replaceNote = async (note, userID, noteID) => {



    const myNote = await noteModel.findById(noteID)

    if (!myNote) throw new Error("note not found", { cause: { status: 404 } })

    if (myNote.userID.toString() !== userID.toString()) throw new Error("you are mot allowed to do this action", { cause: { status: 403 } })
    const updatedNote = await noteModel.updateOne({ _id: noteID }, { title: note.title, content: note.content, userID: note.userID })
    return updatedNote
}
export const updateAllNotes = async (newTitle, userID) => {
    const updatedNotes = await noteModel.updateMany({ userID }, { title: newTitle })
    return updatedNotes



}
export const deleteNote = async (userID, noteID) => {
    const myNote = await noteModel.findById(noteID)

    if (!myNote) throw new Error("note not found", { cause: { status: 404 } })

    if (myNote.userID.toString() !== userID.toString()) throw new Error("you are mot allowed to do this action", { cause: { status: 403 } })
    const deletedNote = await noteModel.findOneAndDelete({ _id: noteID })
    return deletedNote
}
export const getAllNotes = async (userID, page, limit) => {
    page = Number(page)
    limit = Number(limit)
    const notes = await noteModel.find({ userID }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit)
    return notes

}
export const getNote = async (userID, noteID) => {

    const note = await noteModel.findById(noteID)
    if (note.userID.toString() !== userID.toString()) throw new Error("you are mot allowed to do this action", { cause: { status: 403 } })
    return note

}
export const getNote2 = async (userID, content) => {

    const note = await noteModel.find({content,userID})

    return note

}
export const getNotesAndUserInfo=async(userID)=>{
    const notes=await noteModel.find({userID}).select("title content createdAt").populate({path:"userID",select:"email -_id"})
    return notes
}
export const searchNotes = async (userID, title) => {


 let notes
  if (title) {
  
  
   notes = await noteModel.aggregate([

    {
      $match: {
        title,
        userID
      }
    },

    {
      $lookup: {
        from: "Users",
        localField: "userID",
        foreignField: "_id",
        as: "user"
      }
    },


    {
      $project: {
        title: 1,
        content: 1,
        createdAt: 1,
        "user.name": 1,
        "user.email": 1
      }
    }

  ])
}
  else {
      notes = await noteModel.aggregate([

    {
      $match: {
        userID
      }
    },

    {
      $lookup: {
        from: "users",
        localField: "userID",
        foreignField: "_id",
        as: "user"
      }
    },


    {
      $project: {
        title: 1,
        content: 1,
        createdAt: 1,
        "user.name": 1,
        "user.email": 1
      }
    }

  ])
  }

  return notes
}
export const deleteAllNotes=async(userID)=>{
    const deletedNotes=await noteModel.deleteMany({userID})
        return deletedNotes
    
}
