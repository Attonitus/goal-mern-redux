import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true
})

export const Goal = mongoose.model("goal", goalSchema)