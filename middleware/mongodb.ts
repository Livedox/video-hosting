import mongoose from "mongoose";
import {NextApiRequest, NextApiResponse} from "next";

const MONGODB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qcwuq.mongodb.net/${process.env.DB_BASE}?retryWrites=true&w=majority`;

const connectDB = (handler: (req: NextApiRequest, res: NextApiResponse) => void) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if (mongoose.connections[0].readyState) {
            return handler(req, res);
        }
        await mongoose.connect(MONGODB_URL);
        return handler(req, res);
    }
};

export default connectDB;