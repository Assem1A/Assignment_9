import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        lowerCase: true,
        validate: {
            validator: function (val) {
                return val !== val.toUpperCase();

            }
        }
    }
    ,
    content: {
        type: String,
        required: true
    }
    ,
    userID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    timestamps: true
}
)
export const noteModel = mongoose.model("note", noteSchema)