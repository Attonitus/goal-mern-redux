import mongoose from "mongoose";


export const connectdb = async() => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("db ok 🔥🔥🔥")
    } catch (error) {
        console.log("error db")
    }
}