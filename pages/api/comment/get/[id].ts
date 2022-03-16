import { NextApiRequest, NextApiResponse } from "next";
import checkAuth from "../../../../middleware/checkAuth";
import connectDB from "../../../../middleware/mongodb";
import CommentModel from "../../../../models/CommentModel";


const handler = async (req: NextApiRequest, res: NextApiResponse, isAuth: boolean) => {
    try {
        if(isAuth && req.method === "GET") {
            const {id} = req.query;
            const data = await CommentModel.find({videoId: id});

            res.status(200).json(data);
            return;
        }
        
        res.status(404).json({type: ""});
    } catch (e) {
        console.log(e);
        res.status(500);
    }
}

export default connectDB(checkAuth(handler));