import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../middleware/mongodb";
import checkAuth from "../../middleware/checkAuth";

const handler = async (_: NextApiRequest, res: NextApiResponse, isAuth: boolean) => {
    try {
        res.status(200).json({type: isAuth ? "ok" : ""});
    } catch (e) {
        console.log(e);
        res.status(500);
    }
}

export default connectDB(checkAuth(handler));