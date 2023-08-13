import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.messsage}`);
        process.exit(1);
    }
}

export default connectDB;