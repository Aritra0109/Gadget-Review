import mongoose from "mongoose";

export const ConnectDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://aritra_das:Password%4001@cluster0.y4qlg.mongodb.net/gadget-review');
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
