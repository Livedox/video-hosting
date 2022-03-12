import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../middleware/mongodb";
import checkAuth from "../../middleware/checkAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse, isAuth: boolean) => {
    try {
        console.log(req.body);
        if (isAuth) {
            res.status(200).json({type: "ok"});
        } else {
            res.status(200).json({type: "redirect"});;
        }
    } catch (e) {
        console.log(e);
        res.status(500);
    }
}

export default connectDB(checkAuth(handler));