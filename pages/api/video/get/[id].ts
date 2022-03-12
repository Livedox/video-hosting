import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../middleware/mongodb";
import VideoModel from "../../../../models/VideoModel";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "GET") {
            const { id } = req.query;
            const data = await VideoModel.findById(id);

            res.status(200).json(data);
            return;
        }
        
        res.status(404);
    } catch (e) {
        console.log(e);
        res.status(500);
    }
}

export default connectDB(handler);